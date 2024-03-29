import type { Plugin } from "vite";
import path from "path";
import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const rootDir = process.cwd();

export default function autoRouter(): Plugin {
  return {
    name: "react-auto-router",
    buildStart: async () => {
      const pagesDir = path.join(rootDir, "src/pages");
      const result: any = [];
      const declarations = [];
      const comment: any = {};
      await createRoute(pagesDir, result, declarations, comment);
      if (comment.indexPage) {
        result.push({
          path: "/",
          element: `<Redirect to='${comment.indexPage}' />`,
        });
      }

      let code = `/* eslint-disable */
/**
 * vite插件自动生成
 */
import React, { useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";


function Redirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

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
 * @param comment 路由注释信息
 */
async function createRoute(filePath, config, declarations, comment) {
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
        const relativePath = path.relative(
          path.join(rootDir, "src/pages"),
          filePath
        );
        let componentName = "";
        parseFile(path.join(filePath, "index.tsx"), (node) => {
          if (node.type === "ExportDefaultDeclaration") {
            componentName =
              node.declaration?.name || node.declaration?.id?.name;
          }
          if (
            !comment.indexPage &&
            node.leadingComments?.some((item) => item.value?.includes("@index"))
          ) {
            comment.indexPage = "/" + relativePath;
          }
        });
        route.path = "/" + relativePath;
        route.element = `<${componentName} />`;
        config.push(route);
        declarations.push({
          key: componentName,
          value: `React.lazy(() => import("./${relativePath}"))`,
        });
      }
      for await (const item of filePaths) {
        const itemFilePath = path.join(filePath, item);
        await createRoute(
          itemFilePath,
          route.path ? route.children : config,
          declarations,
          comment
        );
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
}
