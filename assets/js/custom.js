/* CarWash & Shine: non-invasive scroll reveal for the existing Dopetrope markup. */
(function () {
	'use strict';

	function addRevealClasses(elements) {
		elements.forEach(function (element, index) {
			if (element.closest('#header, #footer') || element.classList.contains('reveal-ready')) return;

			element.classList.add('reveal-ready');
			element.classList.add(['reveal-left', 'reveal-right', 'reveal-up', 'reveal-scale'][index % 4]);
		});
	}

	function start() {
		var targets = Array.prototype.slice.call(document.querySelectorAll('#intro .col-4 > section, #main .box, #main > .container > .row > .col-12 > section, #main .service-intro, #main .polish-step, #main .polish-result, #main .wash-step, #main .wash-result'));
		addRevealClasses(targets);

		var revealTargets = document.querySelectorAll('.reveal-ready');
		if (!('IntersectionObserver' in window)) {
			revealTargets.forEach(function (element) { element.classList.add('is-visible'); });
			return;
		}

		var observer = new IntersectionObserver(function (entries, currentObserver) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('is-visible');
				currentObserver.unobserve(entry.target);
			});
		}, { rootMargin: '0px 0px -8% 0px', threshold: .12 });

		revealTargets.forEach(function (element) { observer.observe(element); });
	}

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
	else start();
}());
