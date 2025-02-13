import catalogFixture from "../../__fixtures__/catalog.json";
import { CDKType } from "../../constants/constructs";
import { Language } from "../../constants/languages";
import { ExtendedCatalogPackage } from "./catalog-search";
import { CatalogSearchSort } from "./constants";
import { SORT_FUNCTIONS, FILTER_FUNCTIONS, renderAllKeywords } from "./util";

const packages = catalogFixture.packages as any as ExtendedCatalogPackage[];

describe("Catalog Search Utils", () => {
  describe("Sort Functions", () => {
    it("Sorts by Publish Date", () => {
      const resultsAscending = [...packages].sort(
        SORT_FUNCTIONS[CatalogSearchSort.PublishDateAsc]
      );
      const resultsDescending = [...packages].sort(
        SORT_FUNCTIONS[CatalogSearchSort.PublishDateDesc]
      );

      expect(
        resultsAscending.map(({ name, metadata: { date } }) => ({ name, date }))
      ).toMatchSnapshot();

      resultsAscending.forEach((res, idx) => {
        expect(res.metadata.date).toEqual(
          resultsDescending[resultsDescending.length - 1 - idx].metadata.date
        );
      });
    });

    it("Sorts by Package Name", () => {
      const resultsAscending = [...packages].sort(
        SORT_FUNCTIONS[CatalogSearchSort.NameAsc]
      );
      const resultsDescending = [...packages].sort(
        SORT_FUNCTIONS[CatalogSearchSort.NameDesc]
      );

      expect(resultsAscending.map(({ name }) => ({ name }))).toMatchSnapshot();

      expect(
        resultsAscending.map(({ name, metadata: { date } }) => ({ name, date }))
      ).toMatchSnapshot();

      resultsAscending.forEach((res, idx) => {
        expect(res.name).toEqual(
          resultsDescending[resultsDescending.length - 1 - idx].name
        );
      });
    });
  });

  describe("Filter Functions", () => {
    // To be implemented, will need new fixture
    it("Filters by CDK Type", () => {
      const filterByCdk8s = FILTER_FUNCTIONS.cdkType(CDKType.cdk8s)!;
      expect(packages.filter(filterByCdk8s)).toEqual(
        packages.filter((p) => p.metadata.constructFramework?.name === "cdk8s")
      );
    });

    it("Filters by CDK Version", () => {
      const dataWithMoreVersions: ExtendedCatalogPackage[] = packages.map(
        (p) => ({
          ...p,
          metadata: {
            ...p.metadata,
            ...(p.metadata.constructFramework
              ? {
                  constructFramework: {
                    ...p.metadata.constructFramework,
                    majorVersion: Math.round(Math.random()) + 1,
                  },
                }
              : {}),
          },
        })
      );

      expect(
        dataWithMoreVersions.filter(FILTER_FUNCTIONS.cdkMajor(1)!)
      ).toEqual(
        dataWithMoreVersions.filter(
          (p) => p.metadata.constructFramework?.majorVersion === 1
        )
      );
    });

    it("Filters by multiple languages", () => {
      const filterByJavaOrPython = FILTER_FUNCTIONS.languages([
        Language.Python,
        Language.Java,
      ])!;

      expect(packages.filter(filterByJavaOrPython)).toEqual(
        packages.filter(
          (p) =>
            p.languages?.java !== undefined || p.languages?.python !== undefined
        )
      );

      // Gotcha case - TS is always supported so no filter function should be returned
      const filterByTypeScriptOrDotNet = FILTER_FUNCTIONS.languages([
        Language.TypeScript,
        Language.DotNet,
      ])!;

      expect(filterByTypeScriptOrDotNet).toBeUndefined();
    });

    it("Filters by one or more keywords", () => {
      const keywords = ["cicd", "s3"];

      [[keywords[0]], [keywords[1]], keywords].forEach((keywordGroup) => {
        expect(
          packages.filter(FILTER_FUNCTIONS.keywords(keywordGroup)!)
        ).toEqual(
          packages.filter((p) =>
            keywordGroup.some((keyword) => p.keywords?.includes(keyword))
          )
        );
      });
    });

    it("Treats tags as keywords", () => {
      const query = (...keywords: string[]) =>
        packages
          .filter(FILTER_FUNCTIONS.keywords(keywords)!)
          .map((r) => r.name);

      expect(query("databases")).toStrictEqual([
        "aws-cdk-image-resize",
        "@aws-cdk/aws-lambda-nodejs",
      ]);

      expect(query("partners")).toStrictEqual(["aws-cdk-image-resize"]);
      expect(query("databases", "partners")).toStrictEqual([
        "aws-cdk-image-resize",
        "@aws-cdk/aws-lambda-nodejs",
      ]);

      // only search in tags that are associated with keywords and not highlights.
      expect(query("non-keyword")).toStrictEqual([]);
    });
  });
});

describe("renderAllKeywords", () => {
  it("returns a normalized set (all lowercase)", () => {
    expect(
      renderAllKeywords({
        ...packages[0],
        keywords: ["Foo", "foo", "FoO", "bar", "eh"],
      })
    ).toStrictEqual(["foo", "bar", "eh"]);
  });

  it("includes both publisher keywords and tag keywords", () => {
    expect(
      renderAllKeywords({
        ...packages[0],
        keywords: ["Foo", "foo", "FoO", "bar", "eh"],
        metadata: {
          date: "DATE",
          packageTags: [
            { id: "id1", keyword: { label: "boom" } },
            { id: "id2", keyword: { label: "bar" } },
            { id: "id3", highlight: { label: "baz" } },
          ],
        },
      })
    ).toStrictEqual(["foo", "bar", "eh", "boom"]);
  });

  it("filters out certain keywords", () => {
    expect(
      renderAllKeywords({
        ...packages[0],
        keywords: ["cdk-construct", "foo"],
        metadata: {
          date: "DATE",
          packageTags: [{ id: "id1", keyword: { label: "construct" } }],
        },
      })
    ).toStrictEqual(["foo"]);
  });
});
