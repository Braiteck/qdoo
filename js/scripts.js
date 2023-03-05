// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
OVERLAY = document.querySelector('.overlay')


document.addEventListener('DOMContentLoaded', function () {
	// Карусель брендов
	const brandsSliders = [],
		brands = document.querySelectorAll('.brands .swiper')

	brands.forEach(function (el, i) {
		el.classList.add('brands_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 1,
					grid: {
						rows: 2
					}
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2,
					grid: {
						rows: 2
					}
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 3,
					grid: {
						rows: 2
					}
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 4,
					grid: {
						rows: 2
					}
				},
				1280: {
					spaceBetween: 24,
					slidesPerView: 5,
					grid: {
						rows: 2
					}
				}
			}
		}

		brandsSliders.push(new Swiper('.brands_s' + i, options))
	})


	// Маска ввода
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Выбор файла
	const fileInputs = document.querySelectorAll('form input[type=file]')

	if (fileInputs) {
		fileInputs.forEach(el => {
			el.addEventListener('change', () => el.closest('.file').querySelector('label span').innerText = el.value)
		})
	}


	// Кастомный select
	const selects = document.querySelectorAll('select')

	if (selects) {
		selects.forEach(el => NiceSelect.bind(el))
	}


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}


	// Всплывающие окна
	$('.we_work_with .get_offer form').submit(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#get_offer_modal',
			type: 'inline'
		}])
	})
})



window.addEventListener('load', function () {
	// Выравнивание элементов в сетке
	document.querySelectorAll('.services .row').forEach(el => {
		let styles = getComputedStyle(el)

		servicesHeight(el, parseInt(styles.getPropertyValue('--services_count')))
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}


		// Выравнивание элементов в сетке
		document.querySelectorAll('.services .row').forEach(el => {
			let styles = getComputedStyle(el)

			servicesHeight(el, parseInt(styles.getPropertyValue('--services_count')))
		})
	}
})



// Выравнивание услуг
function servicesHeight(context, step) {
	let start = 0,
		finish = step,
		services = [...context.querySelectorAll('.service')],
		servicesName = context.querySelectorAll('.name'),
		servicesDesc = context.querySelectorAll('.desc'),
		i = 0

	servicesName.forEach(el => el.style.height = 'auto')
	servicesDesc.forEach(el => el.style.height = 'auto')

	services.forEach(el => {
		services.slice(start, finish).forEach(el => el.setAttribute('nodeList', i))

		setHeight(context.querySelectorAll('[nodeList="' + i + '"] .name'))
		setHeight(context.querySelectorAll('[nodeList="' + i + '"] .desc'))

		start = start + step
		finish = finish + step
		i++
	})
}