import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// =========================================
// NAVIGATION DATA
// =========================================

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",

      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt: "Women's clothing",
        },
        {
          name: "Clothing",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt: "Women's clothing",
        },
      ],

      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            {
              name: "Kurtas",
              category: "women_kurta",
            },
            {
              name: "Sarees",
              category: "women_saree",
            },
          ],
        },

        {
          id: "accessories",
          name: "Accessories",
          items: [
            {
              name: "Bags",
              category: "women_bag",
            },
            {
              name: "Jewelry",
              category: "women_jewelry",
            },
            {
              name: "Watches",
              category: "women_watch",
            },
          ],
        },

        {
          id: "shoes",
          name: "Shoes",
          items: [
            {
              name: "Sneakers",
              category: "women_sneakers",
            },
            {
              name: "Boots",
              category: "women_boots",
            },
            {
              name: "Sandals",
              category: "women_sandals",
            },
          ],
        },
      ],
    },

    {
      id: "men",
      name: "Men",

      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt: "Men's clothing",
        },
        {
          name: "Clothing",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt: "Men's clothing",
        },
      ],

      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            {
              name: "Kurtas",
              category: "mens_kurta",
            },
            {
              name: "Shirts",
              category: "mens_shirt",
            },
          ],
        },

        {
          id: "accessories",
          name: "Accessories",
          items: [
            {
              name: "Watches",
              category: "mens_watch",
            },
            {
              name: "Wallets",
              category: "men_wallet",
            },
            {
              name: "Bags",
              category: "men_bag",
            },
          ],
        },

        {
          id: "shoes",
          name: "Shoes",
          items: [
            {
              name: "Shoes",
              category: "men_shoe",
            },
          ],
        },
      ],
    },
  ],

  pages: [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ],
};

// =========================================
// NAVIGATION COMPONENT
// =========================================

export default function Navigation() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, isLoggedIn, logout } = useAuth();

  // =========================================
  // CART COUNT
  // =========================================

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const count = savedCart.reduce(
        (total, item) =>
          total + Number(item.quantity || 1),
        0
      );

      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  // =========================================
  // CATEGORY CLICK
  // =========================================

  const handleCategoryClick = (category) => {
    setOpen(false);
    setProfileOpen(false);

    navigate(`/products/${category}`);
  };

  // =========================================
  // MAIN CATEGORY CLICK
  // =========================================

  const handleMainCategoryClick = (category) => {
    setOpen(false);
    setProfileOpen(false);

    navigate(`/products/${category}`);
  };

  // =========================================
  // SIGN IN
  // =========================================

  const handleSignIn = () => {
    setOpen(false);
    navigate("/signin");
  };

  // =========================================
  // CREATE ACCOUNT
  // =========================================

  // const handleCreateAccount = () => {
  //   setOpen(false);
  //   navigate("/register");
  // };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setOpen(false);
    navigate("/");
  };

  // =========================================
  // CART
  // =========================================

  const handleCart = () => {
    navigate("/cart");
  };

  // =========================================
  // FIRST LETTER
  // =========================================

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  // =========================================
  // RETURN
  // =========================================

  return (
    <div className="bg-white">

      {/* ========================================= */}
      {/* MOBILE MENU */}
      {/* ========================================= */}

      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">

            {/* CLOSE BUTTON */}

            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            {/* MOBILE CATEGORY TABS */}

            <TabGroup className="mt-2">

              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">

                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900"
                    >
                      {category.name}
                    </Tab>
                  ))}

                </TabList>
              </div>

              <TabPanels as={Fragment}>

                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >

                    {/* VIEW ALL CATEGORY */}

                    <button
                      onClick={() =>
                        handleMainCategoryClick(category.id)
                      }
                      className="w-full rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white"
                    >
                      View All {category.name}
                    </button>

                    {/* FEATURED */}

                    <div className="grid grid-cols-2 gap-x-4">

                      {category.featured.map((item) => (
                        <div
                          key={item.name}
                          className="group relative text-sm"
                        >
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover"
                          />

                          <p className="mt-6 block font-medium text-gray-900">
                            {item.name}
                          </p>

                          <p className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}

                    </div>

                    {/* CATEGORY SECTIONS */}

                    {category.sections.map((section) => (
                      <div key={section.name}>

                        <p className="font-medium text-gray-900">
                          {section.name}
                        </p>

                        <ul className="mt-6 flex flex-col space-y-6">

                          {section.items.map((item) => (
                            <li key={item.name}>

                              <button
                                onClick={() =>
                                  handleCategoryClick(
                                    item.category
                                  )
                                }
                                className="block text-gray-500 hover:text-gray-900"
                              >
                                {item.name}
                              </button>

                            </li>
                          ))}

                        </ul>

                      </div>
                    ))}

                  </TabPanel>
                ))}

              </TabPanels>

            </TabGroup>

            {/* MOBILE PAGES */}

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">

              {navigation.pages.map((page) => (
                <div
                  key={page.name}
                  className="flow-root"
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate(page.href);
                    }}
                    className="p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </button>
                </div>
              ))}

            </div>

            {/* MOBILE LOGIN */}

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">

              {!isLoggedIn ? (

                <div>
                  <button
                    onClick={handleSignIn}
                    className="font-medium text-gray-900"
                  >
                    Sign in / Create Account
                  </button>
                </div>

              ) : (

                <div>

                  <div className="mb-4 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                      {firstLetter}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        {user?.name || "User"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {user?.email}
                      </p>
                    </div>

                  </div>
                  <button
                    onClick={() => navigate("/my-orders")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </button>

                  <button
                    onClick={handleLogout}
                    className="font-medium text-red-600"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          </DialogPanel>
        </div>
      </Dialog>

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <header className="relative bg-white">

        {/* TOP DELIVERY BAR */}

        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white">
          Get free delivery on orders over $100
        </p>

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="border-b border-gray-200">

            <div className="flex h-16 items-center">

              {/* ========================================= */}
              {/* MOBILE MENU */}
              {/* ========================================= */}

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon className="size-6" />
              </button>

              {/* ========================================= */}
              {/* LOGO */}
              {/* ========================================= */}

              <div className="ml-4 flex lg:ml-0">

                <button
                  onClick={() => navigate("/")}
                >
                  <img
                    alt="Logo"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </button>

              </div>

              {/* ========================================= */}
              {/* DESKTOP MENUS */}
              {/* ========================================= */}

              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">

                <div className="flex h-full space-x-8">

                  {navigation.categories.map((category) => (

                    <Popover
                      key={category.name}
                      className="flex"
                    >

                      <div className="relative flex">

                        {/* MAIN CATEGORY */}

                        <PopoverButton
                          onClick={() =>
                            handleMainCategoryClick(category.id)
                          }
                          className="flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {category.name}
                        </PopoverButton>

                      </div>

                      {/* DROPDOWN */}

                      <PopoverPanel className="absolute inset-x-0 top-full z-20 bg-white shadow">

                        <div className="mx-auto max-w-7xl px-4 py-16">

                          {/* VIEW ALL */}

                          <button
                            onClick={() =>
                              handleMainCategoryClick(category.id)
                            }
                            className="mb-10 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                          >
                            View All {category.name}
                          </button>

                          <div className="grid grid-cols-3 gap-8">

                            {category.sections.map((section) => (

                              <div key={section.name}>

                                <p className="font-medium text-gray-900">
                                  {section.name}
                                </p>

                                <ul className="mt-6 space-y-4">

                                  {section.items.map((item) => (

                                    <li key={item.name}>

                                      <button
                                        onClick={() =>
                                          handleCategoryClick(
                                            item.category
                                          )
                                        }
                                        className="text-gray-500 hover:text-gray-800"
                                      >
                                        {item.name}
                                      </button>

                                    </li>

                                  ))}

                                </ul>

                              </div>

                            ))}

                          </div>

                        </div>

                      </PopoverPanel>

                    </Popover>

                  ))}

                  {/* ABOUT */}

                  <button
                    onClick={() => navigate("/about")}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    About
                  </button>

                  {/* CONTACT */}

                  <button
                    onClick={() => navigate("/contact")}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Contact
                  </button>

                </div>

              </PopoverGroup>

              {/* ========================================= */}
              {/* RIGHT SIDE */}
              {/* ========================================= */}

              <div className="ml-auto flex items-center">

                {/* ========================================= */}
                {/* PROFILE / SIGN IN */}
                {/* ========================================= */}

                {!isLoggedIn ? (

                  <div className="hidden lg:flex lg:items-center lg:space-x-6">

                    <button
                      onClick={handleSignIn}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in / Create Account
                    </button>

                  </div>

                ) : (

                  <div className="relative hidden lg:block">

                    {/* PROFILE CIRCLE */}

                    <button
                      onClick={() =>
                        setProfileOpen(!profileOpen)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white hover:bg-indigo-700"
                      title={user?.name || "Account"}
                    >
                      {firstLetter}
                    </button>

                    {/* PROFILE DROPDOWN */}

                    {profileOpen && (

                      <div className="absolute right-0 top-12 z-50 w-48 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">

                        <div className="border-b px-4 py-3">

                          <p className="text-sm font-semibold text-gray-900">
                            {user?.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-500">
                            {user?.email}
                          </p>

                        </div>
                        <button
                          onClick={() => navigate("/my-orders")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          My Orders
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-gray-50"
                        >
                          Logout
                        </button>

                      </div>

                    )}

                  </div>

                )}

                {/* ========================================= */}
                {/* SEARCH */}
                {/* ========================================= */}

                <div className="flex lg:ml-6">

                  <button
                    onClick={() => { }}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >

                    <span className="sr-only">
                      Search
                    </span>

                    <MagnifyingGlassIcon className="size-6" />

                  </button>

                </div>

                {/* ========================================= */}
                {/* CART */}
                {/* ========================================= */}

                <div className="ml-4 flow-root lg:ml-6">

                  <button
                    onClick={handleCart}
                    className="group -m-2 flex items-center p-2"
                  >

                    <ShoppingBagIcon
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />

                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {cartCount}
                    </span>

                    <span className="sr-only">
                      items in cart
                    </span>

                  </button>

                </div>

              </div>

            </div>

          </div>

        </nav>

      </header>

    </div>
  );
}