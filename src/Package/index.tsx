import { Box } from "@chakra-ui/react";
import * as reflect from "jsii-reflect";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { GettingStarted } from "../GettingStarted";
import { PackageDocs } from "../PackageDocs";
import { PackageHeader } from "../PackageHeader";
import { createAssembly } from "./assemblies";
import { parseSearch, getFullPackageName } from "./util";

interface PathParams {
  name: string;
  scope?: string;
  version: string;
}

interface PackageDocsHomeState {
  assembly?: reflect.Assembly;
  error?: string;
}

export function Package() {
  const { name, scope, version }: PathParams = useParams();
  const [{ assembly }, setState] = useState<PackageDocsHomeState>({});
  const q = parseSearch(useLocation().search);

  useEffect(() => {
    createAssembly(name, version, scope)
      .then((asm: reflect.Assembly) => {
        setState({ assembly: asm });
      })
      .catch((err) => {
        console.error(err);
        setState((s) => ({ ...s, error: err }));
      });
  }, []);

  const targets: string[] = Object.keys(assembly?.targets ?? {});
  return (
    <Box w="100%">
      {/* Operator Area */}
      {assembly && (
        <PackageHeader
          title={getFullPackageName(name, scope)}
          description={assembly?.description}
          tags={[]}
        />
      )}

      {/* Getting Started Area */}
      <GettingStarted targets={targets} />

      {/* Readme and Api Reference Area */}
      {assembly && (
        <PackageDocs
          assembly={assembly}
          language={q.language ?? "python"}
          submodule={q.submodule}
        />
      )}
    </Box>
  );
}
