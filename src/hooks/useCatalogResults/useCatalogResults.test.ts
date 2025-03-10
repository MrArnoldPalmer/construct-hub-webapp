import { renderHook, cleanup } from "@testing-library/react-hooks";
import catalog from "../../__fixtures__/catalog.json";
import stats from "../../__fixtures__/stats.json";
import { Packages } from "../../api/package/packages";
import { PackageStats } from "../../api/stats";
import { useCatalog } from "../../contexts/Catalog";
import { SearchProvider } from "../../contexts/Search";
import { useStats } from "../../contexts/Stats";
import {
  useCatalogResults,
  UseCatalogResultsOptions,
} from "./useCatalogResults";

const catalogFixture = catalog as Packages;
const statsFixture = stats as PackageStats;
const numPackages = catalogFixture.packages.length;

const defaultOptions: UseCatalogResultsOptions = {
  offset: 0,
  limit: 25,
  query: "",
  language: null,
};

const defaultCatalogContext = {
  loading: false,
  error: undefined,
  data: catalogFixture,
};

const defaultStatsContext = {
  loading: false,
  error: undefined,
  data: statsFixture,
};

jest.mock("../../contexts/Catalog", () => ({
  useCatalog: jest.fn(),
}));

jest.mock("../../contexts/Stats", () => ({
  useStats: jest.fn(),
}));

const useCatalogMock = useCatalog as jest.MockedFunction<typeof useCatalog>;
const useStatsMock = useStats as jest.MockedFunction<typeof useStats>;

describe("useCatalogResults", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCatalogMock.mockReturnValue(defaultCatalogContext);
    useStatsMock.mockReturnValue(defaultStatsContext);
  });

  afterEach(cleanup);

  const renderUseCatalog = (options: UseCatalogResultsOptions) =>
    renderHook(() => useCatalogResults(options), { wrapper: SearchProvider });

  it("returns page, pageLimit, results", () => {
    const { result } = renderUseCatalog(defaultOptions);
    const { pageLimit, results, page } = result.current;

    expect(typeof pageLimit).toBe("number");
    expect(typeof page).toBe("object");
    expect(typeof results).toBe("object");
  });

  it("wraps search with pagination functionality", () => {
    const { result: limitTest } = renderUseCatalog({
      ...defaultOptions,
      offset: 0,
      limit: 50,
    });

    expect(limitTest.current.page).toHaveLength(50);

    const { result: offsetTest } = renderUseCatalog({
      ...defaultOptions,
      offset: 2,
      limit: 50,
    });

    expect(offsetTest.current.page).toHaveLength(48);
  });
});
