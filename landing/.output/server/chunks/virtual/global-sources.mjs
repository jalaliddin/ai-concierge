const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/en/sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/ru/sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/uz/sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/en",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en"
                    }
                ]
            },
            {
                "loc": "/ru",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en"
                    }
                ]
            },
            {
                "loc": "/uz",
                "_sitemap": "uz",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en"
                    }
                ]
            },
            {
                "loc": "/en/checkout",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/checkout"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/checkout"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/checkout"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/checkout"
                    }
                ]
            },
            {
                "loc": "/ru/checkout",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/checkout"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/checkout"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/checkout"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/checkout"
                    }
                ]
            },
            {
                "loc": "/uz/checkout",
                "_sitemap": "uz",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/checkout"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/checkout"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/checkout"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/checkout"
                    }
                ]
            },
            {
                "loc": "/en/blog",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/blog"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/blog"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/blog"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/blog"
                    }
                ]
            },
            {
                "loc": "/ru/blog",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/blog"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/blog"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/blog"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/blog"
                    }
                ]
            },
            {
                "loc": "/uz/blog",
                "_sitemap": "uz",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/blog"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/blog"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/blog"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/blog"
                    }
                ]
            },
            {
                "loc": "/en/services",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/services"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/services"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/services"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/services"
                    }
                ]
            },
            {
                "loc": "/ru/services",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/services"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/services"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/services"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/services"
                    }
                ]
            },
            {
                "loc": "/uz/services",
                "_sitemap": "uz",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/services"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/services"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/services"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/services"
                    }
                ]
            },
            {
                "loc": "/en/transfers",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/transfers"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/transfers"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/transfers"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/transfers"
                    }
                ]
            },
            {
                "loc": "/ru/transfers",
                "_sitemap": "ru",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/transfers"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/transfers"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/transfers"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/transfers"
                    }
                ]
            },
            {
                "loc": "/uz/transfers",
                "_sitemap": "uz",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/en/transfers"
                    },
                    {
                        "hreflang": "ru",
                        "href": "/ru/transfers"
                    },
                    {
                        "hreflang": "uz",
                        "href": "/uz/transfers"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/en/transfers"
                    }
                ]
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
