import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

import ProductCard from "./ProductCard";
import { filters, singleFilter } from "./FilterData";

// =========================================
// CLASS NAMES
// =========================================

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// =========================================
// PRODUCT COMPONENT
// =========================================

export default function Product() {
  // =========================================
  // GET CATEGORY FROM URL
  // =========================================

  const { category } = useParams();

  // =========================================
  // PRODUCTS FROM BACKEND
  // =========================================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // =========================================
  // CATEGORY FILTER
  // =========================================

  const categoryProducts =
    category === "men"
      ? products.filter((product) =>
          ["mens_kurta", "men_shoe", "mens_watch"].includes(
            product.category
          )
        )
      : category === "women"
      ? products.filter((product) =>
          ["women_kurta", "women_saree"].includes(
            product.category
          )
        )
      : products.filter(
          (product) => product.category === category
        );

  // =========================================
  // STATE
  // =========================================

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [selectedColors, setSelectedColors] =
    useState([]);

  const [selectedSizes, setSelectedSizes] =
    useState([]);

  const [selectedPrice, setSelectedPrice] =
    useState([]);

  const [selectedDiscount, setSelectedDiscount] =
    useState([]);

  const [selectedStock, setSelectedStock] =
    useState([]);

  const [sort, setSort] = useState("");

  // =========================================
  // COLOR
  // =========================================

  const handleColorChange = (color) => {
    setSelectedColors((previous) => {
      if (previous.includes(color)) {
        return previous.filter((item) => item !== color);
      }

      return [...previous, color];
    });
  };

  // =========================================
  // SIZE
  // =========================================

  const handleSizeChange = (size) => {
    setSelectedSizes((previous) => {
      if (previous.includes(size)) {
        return previous.filter((item) => item !== size);
      }

      return [...previous, size];
    });
  };

  // =========================================
  // PRICE
  // =========================================

  const handlePriceChange = (price) => {
    setSelectedPrice((previous) => {
      if (previous.includes(price)) {
        return previous.filter((item) => item !== price);
      }

      return [...previous, price];
    });
  };

  // =========================================
  // DISCOUNT
  // =========================================

  const handleDiscountChange = (discount) => {
    setSelectedDiscount((previous) => {
      if (previous.includes(discount)) {
        return previous.filter((item) => item !== discount);
      }

      return [...previous, discount];
    });
  };

  // =========================================
  // STOCK
  // =========================================

  const handleStockChange = (stock) => {
    setSelectedStock((previous) => {
      if (previous.includes(stock)) {
        return previous.filter((item) => item !== stock);
      }

      return [...previous, stock];
    });
  };

  // =========================================
  // FILTER PRODUCTS
  // IMPORTANT:
  // USE categoryProducts, NOT products
  // =========================================

  const filteredProducts = categoryProducts.filter(
    (product) => {
      // =====================================
      // COLOR
      // =====================================

      const colorMatch =
        selectedColors.length === 0 ||
        selectedColors.some(
          (color) =>
            product.color?.toLowerCase() ===
            color.toLowerCase()
        );

      // =====================================
      // SIZE
      // =====================================

      const sizeMatch =
        selectedSizes.length === 0 ||
        product.size?.some((item) =>
          selectedSizes.includes(item.name)
        );

      // =====================================
      // PRICE
      // =====================================

      const priceMatch =
        selectedPrice.length === 0 ||
        selectedPrice.some((range) => {
          const [min, max] =
            range.split("-").map(Number);

          return (
            Number(product.discountedPrice) >= min &&
            Number(product.discountedPrice) <= max
          );
        });

      // =====================================
      // DISCOUNT
      // =====================================

      const discountMatch =
        selectedDiscount.length === 0 ||
        selectedDiscount.some((discount) => {
          const productDiscount = Number(
            String(product.discountPersent)
              .replace("%", "")
              .replace("off", "")
              .trim()
          );

          return (
            productDiscount >= Number(discount)
          );
        });

      // =====================================
      // STOCK
      // =====================================

      const totalQuantity =
        product.size?.reduce(
          (total, item) =>
            total +
            Number(item.quantity || 0),
          0
        ) || 0;

      const stockMatch =
        selectedStock.length === 0 ||
        selectedStock.some((stock) => {
          if (stock === "in_stock") {
            return totalQuantity > 0;
          }

          if (stock === "out_of_stock") {
            return totalQuantity === 0;
          }

          return true;
        });

      // =====================================
      // FINAL FILTER
      // =====================================

      return (
        colorMatch &&
        sizeMatch &&
        priceMatch &&
        discountMatch &&
        stockMatch
      );
    }
  );

  // =========================================
  // SORT PRODUCTS
  // =========================================

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sort === "low") {
        return (
          Number(a.discountedPrice) -
          Number(b.discountedPrice)
        );
      }

      if (sort === "high") {
        return (
          Number(b.discountedPrice) -
          Number(a.discountedPrice)
        );
      }

      return 0;
    }
  );

  // =========================================
  // CHECKBOX
  // =========================================

  const renderFilterCheckbox = (
    section,
    option,
    optionIdx,
    mobile = false
  ) => {
    let checked = false;

    if (section.id === "color") {
      checked = selectedColors.includes(option.value);
    }

    if (section.id === "size") {
      checked = selectedSizes.includes(option.value);
    }

    if (section.id === "price") {
      checked = selectedPrice.includes(option.value);
    }

    if (section.id === "discount") {
      checked = selectedDiscount.includes(option.value);
    }

    if (section.id === "stock") {
      checked = selectedStock.includes(option.value);
    }

    const handleChange = () => {
      if (section.id === "color") {
        handleColorChange(option.value);
      }

      if (section.id === "size") {
        handleSizeChange(option.value);
      }

      if (section.id === "price") {
        handlePriceChange(option.value);
      }

      if (section.id === "discount") {
        handleDiscountChange(option.value);
      }

      if (section.id === "stock") {
        handleStockChange(option.value);
      }
    };

    return (
      <div
        key={`${section.id}-${option.value}-${optionIdx}`}
        className="flex items-center"
      >
        <input
          id={`${mobile ? "mobile" : "desktop"}-${section.id}-${optionIdx}`}
          type="checkbox"
          value={option.value}
          checked={checked}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />

        <label
          htmlFor={`${mobile ? "mobile" : "desktop"}-${section.id}-${optionIdx}`}
          className="ml-3 text-sm text-gray-600"
        >
          {option.label}
        </label>
      </div>
    );
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-xl font-semibold">
          Loading products...
        </h2>
      </div>
    );
  }

  // =========================================
  // PAGE HEADING
  // =========================================

  const getHeading = () => {
    if (category === "men") {
      return "Men's Products";
    }

    if (category === "women") {
      return "Women's Products";
    }

    if (category === "mens_kurta") {
      return "Men's Kurta";
    }

    if (category === "women_kurta") {
      return "Women's Kurta";
    }

    if (category === "men_shoe") {
      return "Men's Shoes";
    }

    if (category === "women_saree") {
      return "Women's Saree";
    }

    if (category === "mens_watch") {
      return "Men's Watch";
    }

    return "Products";
  };

  // =========================================
  // JSX
  // =========================================

  return (
    <div className="bg-white">

      {/* ================================= */}
      {/* MOBILE FILTER */}
      {/* ================================= */}

      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form className="mt-4 border-t border-gray-200">

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>

                          {open ? (
                            <MinusIcon className="h-5 w-5" />
                          ) : (
                            <PlusIcon className="h-5 w-5" />
                          )}
                        </DisclosureButton>
                      </h3>

                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map(
                            (option, optionIdx) =>
                              renderFilterCheckbox(
                                section,
                                option,
                                optionIdx,
                                true
                              )
                          )}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}

              {singleFilter.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>

                          {open ? (
                            <MinusIcon className="h-5 w-5" />
                          ) : (
                            <PlusIcon className="h-5 w-5" />
                          )}
                        </DisclosureButton>
                      </h3>

                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map(
                            (option, optionIdx) =>
                              renderFilterCheckbox(
                                section,
                                option,
                                optionIdx,
                                true
                              )
                          )}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}

            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* ================================= */}
      {/* MAIN */}
      {/* ================================= */}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADING + SORT */}

        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {getHeading()}
          </h1>

          {/* SORT */}

          <div className="flex items-center">

            <Menu
              as="div"
              className="relative inline-block text-left"
            >
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700">
                Sort

                <ChevronDownIcon
                  className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5">

                <div className="py-1">

                  <MenuItem>
                    <button
                      type="button"
                      onClick={() => setSort("low")}
                      className={classNames(
                        "block w-full px-4 py-2 text-left text-sm",
                        sort === "low"
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-500"
                      )}
                    >
                      Price: Low to High
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button
                      type="button"
                      onClick={() => setSort("high")}
                      className={classNames(
                        "block w-full px-4 py-2 text-left text-sm",
                        sort === "high"
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-500"
                      )}
                    >
                      Price: High to Low
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button
                      type="button"
                      onClick={() => setSort("")}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-500"
                    >
                      Default
                    </button>
                  </MenuItem>

                </div>

              </MenuItems>
            </Menu>

            {/* MOBILE FILTER */}

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(true)
              }
              className="ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>

          </div>
        </div>

        {/* ================================= */}
        {/* PRODUCTS */}
        {/* ================================= */}

        <section className="pb-24 pt-6">

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

            {/* DESKTOP FILTER */}

            <form className="hidden lg:block">

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm">

                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>

                        {open ? (
                          <MinusIcon className="h-5 w-5" />
                        ) : (
                          <PlusIcon className="h-5 w-5" />
                        )}

                      </DisclosureButton>

                      <DisclosurePanel className="pt-6">

                        <div className="space-y-4">

                          {section.options.map(
                            (option, optionIdx) =>
                              renderFilterCheckbox(
                                section,
                                option,
                                optionIdx
                              )
                          )}

                        </div>

                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}

              {singleFilter.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm">

                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>

                        {open ? (
                          <MinusIcon className="h-5 w-5" />
                        ) : (
                          <PlusIcon className="h-5 w-5" />
                        )}

                      </DisclosureButton>

                      <DisclosurePanel className="pt-6">

                        <div className="space-y-4">

                          {section.options.map(
                            (option, optionIdx) =>
                              renderFilterCheckbox(
                                section,
                                option,
                                optionIdx
                              )
                          )}

                        </div>

                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}

            </form>

            {/* ================================= */}
            {/* PRODUCT GRID */}
            {/* ================================= */}

            <div className="lg:col-span-3 w-full">

              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3">

                {sortedProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                ))}

              </div>

              {/* NO PRODUCTS */}

              {sortedProducts.length === 0 && (
                <div className="py-20 text-center">

                  <h2 className="text-xl font-semibold text-gray-700">
                    No products found
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Try changing your filters.
                  </p>

                </div>
              )}

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}