import './app.scss';

export const NJSelect = class {
    constructor(el) {
        const self = this;
        self.select = el;
        self.mobile = {
            Android: () => {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: () => {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: () => {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: () => {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: () => {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: () => {
                return (self.mobile.Android() || self.mobile.BlackBerry() || self.mobile.iOS() || self.mobile.Opera() || self.mobile.Windows());
            }
        };
        self.className = {
            main: 'nj-select',
            native: 'nj--native',
            open: 'nj--open',
            active: 'nj--active'
        };
        self._init = () => {
            self.wrapper = document.createElement('div');
            self.active = document.createElement('button');
            self.list = document.createElement('ul');
            self.activeIndex = self.select.selectedIndex;
            self.buttons = [];
            self.wrapper.classList.add(self.className.main);
            self.select.classList.add(`${self.className.main}__select`);
            self.active.classList.add(`${self.className.main}__active`);
            self.active.setAttribute('type', 'button');
            self.list.classList.add(`${self.className.main}__list`);

            // scaffolding
            self.select.parentNode.insertBefore(self.wrapper, self.select);
            self.wrapper.appendChild(self.select);
            self.wrapper.appendChild(self.active);
            self.wrapper.appendChild(self.list);

            for (let i = 0; i < self.select.options.length; i++) {
                const item = self.select.options[i];
                const li = document.createElement('li');
                const btn = document.createElement('button');
                const click = () => {
                    self._setActive(i);
                };

                li.classList.add(`${self.className.main}__list-item`);
                btn.classList.add(`${self.className.main}__list-btn`);
                btn.setAttribute('type', 'button');

                if (item.disabled) {
                    btn.disabled = true;
                }

                self.list.appendChild(li);
                li.appendChild(btn);
                btn.innerHTML = item.innerHTML;

                self.buttons.push(click);
                btn.addEventListener('click', click);
            }

            // change active option
            self._setActive();

            // show/hide native select
            if (self._isMobile()) {
                self.wrapper.classList.add(self.className.native);
            }

            // events
            self.select.addEventListener('change', self._selectChange);
            self.active.addEventListener('click', self._activeClick);
        };
        self._setActive = index => {
            const activeIndex = index >= 0 ? index : this.select.selectedIndex;
            const items = this.list.children;

            // clear active class
            items[this.activeIndex].classList.remove(this.className.active);
            this.activeIndex = activeIndex;

            // change selected option if clicked on list item
            if (index >= 0) {
                this.select.selectedIndex = this.activeIndex;
                this.select.dispatchEvent(new Event('change'));
            }

            // set new active option
            this.active.innerHTML = this.select.options[this.activeIndex].innerHTML;
            items[this.activeIndex].classList.add(this.className.active);

            if (this.select.options[this.activeIndex].getAttribute('value')) {
                this.active.classList.remove('is-placeholder');
            } else {
                this.active.classList.add('is-placeholder');
            }
        };
        self._isMobile = () => {
            return this.mobile.any();
        };
        self._selectChange = () => {
            self._setActive();
        };
        self._activeClick = (event) => {
            event.stopPropagation();
            self.wrapper.classList[self.wrapper.classList.contains(self.className.open) ? 'remove' : 'add'](self.className.open);
            document.body.addEventListener('click', close);

            function close() {
                self.wrapper.classList.remove(self.className.open);
                document.body.removeEventListener('click', close);
            }
        };

        self._init();
    }

    update() {
        this.destroy();
        this._init();
    }

    destroy() {
        const self = this;
        const buttons = self.list.querySelectorAll(`.${self.className.main}__list-btn`);
        for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i];
            btn.removeEventListener('click', self.buttons[i]);
        }

        self.select.removeEventListener('change', self._selectChange);
        self.active.removeEventListener('click', self._activeClick);
        self.wrapper.parentNode.insertBefore(self.select, self.wrapper);
        self.select.classList.remove(`${self.className.main}__select`);
        self.active.remove();
        self.list.remove();
        self.wrapper.remove();
    }
}

export default NJSelect;
