(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window["FLS"] = true;
    isWebp();
    let app_bodyLockStatus = true;
    let app_bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) app_bodyUnlock(delay); else app_bodyLock(delay);
    };
    let app_bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (app_bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            app_bodyLockStatus = false;
            setTimeout((function() {
                app_bodyLockStatus = true;
            }), delay);
        }
    };
    let app_bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (app_bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            app_bodyLockStatus = false;
            setTimeout((function() {
                app_bodyLockStatus = true;
            }), delay);
        }
    };
    const menuList = document.querySelector(".menu__list");
    function app_menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (e.target.closest(".icon-menu")) {
                app_bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    app_menuInit();
    if (document.documentElement.clientWidth < 768) menuList.addEventListener("click", (e => {
        if (e.target.closest(".menu__link")) {
            app_bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
    }));
})();