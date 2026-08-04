"use strict";

(function () {
	var THEME_KEY = "theme-preference-ultimatedotnetcheatsheet";
	var root = document.documentElement;
	var sidebar = document.getElementById("sidebar");
	var menuToggle = document.getElementById("menu-toggle");
	var themeToggle = document.getElementById("theme-toggle");
	var printButton = document.getElementById("print-button");

	function getPreferredTheme() {
		var saved = localStorage.getItem(THEME_KEY);
		if (saved === "dark" || saved === "light") {
			return saved;
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	function applyTheme(theme) {
		root.setAttribute("data-theme", theme);
		if (themeToggle) {
			var next = theme === "dark" ? "light" : "dark";
			themeToggle.setAttribute("aria-label", "Switch to " + next + " mode");
		}
	}

	function toggleTheme() {
		var current = root.getAttribute("data-theme") || "light";
		var next = current === "dark" ? "light" : "dark";
		applyTheme(next);
		localStorage.setItem(THEME_KEY, next);
	}

	function setMenuState(open) {
		if (!sidebar || !menuToggle) {
			return;
		}
		sidebar.classList.toggle("is-open", open);
		menuToggle.setAttribute("aria-expanded", String(open));
	}

	applyTheme(getPreferredTheme());

	if (themeToggle) {
		themeToggle.addEventListener("click", toggleTheme);
	}

	if (menuToggle) {
		menuToggle.addEventListener("click", function () {
			var isOpen = !!(sidebar && sidebar.classList.contains("is-open"));
			setMenuState(!isOpen);
		});
	}

	if (printButton) {
		printButton.addEventListener("click", function () {
			window.print();
		});
	}

	document.addEventListener("click", function (event) {
		var mobile = window.matchMedia("(max-width: 960px)").matches;
		if (!mobile || !sidebar || !menuToggle || !sidebar.classList.contains("is-open")) {
			return;
		}

		var target = event.target;
		if (!(target instanceof Node)) {
			return;
		}

		if (!sidebar.contains(target) && !menuToggle.contains(target)) {
			setMenuState(false);
		}
	});

	window.addEventListener("resize", function () {
		var desktop = window.matchMedia("(min-width: 961px)").matches;
		if (desktop) {
			setMenuState(false);
		}
	});
})();
