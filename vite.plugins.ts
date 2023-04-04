import type { Plugin } from "vite";
import path from "path";
import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

export function autoRouter(): Plugin {
  return {
    name: "react-auto-router",
    buildStart: async () => {
      const pagesDir = path.join(__dirname, "src/pages");
      const result = [];
      const declarations = [];
      await createRoute(pagesDir, result, declarations);

      let code = `
import React from "react";
import { RouteObject } from "react-router-dom";

`;
      declarations.forEach((item) => {
        code += `const ${item.key} = ${item.value}; \n`;
      });
      code += `
const routes: RouteObject[] = ${JSON.stringify(result, null, 2)};
export default routes;      
      `;
      code = code.replace(/"(<.*? \/>)"/g, "$1");

      fs.writeFileSync(path.join(pagesDir, "routes.tsx"), code, "utf-8");

      return null;
    },
  };
}

/**
 * 解析文件
 * @param {*} filePath
 * @param {*} callback
 */
function parseFile(filePath, callback) {
  const data = fs.readFileSync(filePath, "utf-8");
  const ast = parse(data, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
  traverse.default(ast, {
    enter(path) {
      const node = path.node;
      callback(node);
    },
  });
}

/**
 * 生成路由配置
 * @param filePath 路由文件目录
 * @param config 路由配置
 * @param declaration 声明路由组件
 */
async function createRoute(filePath, config, declarations) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory() && !filePath.includes("components")) {
      const filePaths = fs.readdirSync(filePath);
      const route = {
        path: "",
        element: null,
        children: [],
      };
      if (filePaths.includes("index.tsx")) {
        let componentName = "";
        parseFile(path.join(filePath, "index.tsx"), (node) => {
          if (node.type === "ExportDefaultDeclaration") {
            componentName =
              node.declaration?.name || node.declaration?.id?.name;
          }
        });
        route.path =
          "/" + path.relative(path.join(__dirname, "src/pages"), filePath);
        route.element = `<${componentName} />`;
        config.push(route);
        declarations.push({
          key: componentName,
          value: `React.lazy(() => import("./${route.path}"))`,
        });
      }
      for await (let item of filePaths) {
        const itemFilePath = path.join(filePath, item);
        await createRoute(
          itemFilePath,
          route.path ? route.children : config,
          declarations
        );
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
}