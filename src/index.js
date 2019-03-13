import './app.scss';

export const NJSelect = class {
    constructor(el) {
        const self = this;
        self.select = el;
        self.wrapper = document.createElement('div');
        self.active = document.createElement('button');
        self.list = document.createElement('ul');
        self.activeIndex = self.select.selectedIndex;
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

        // scaffolding
        self.wrapper.classList.add(self.className.main);
        self.select.classList.add(`${self.className.main}__select`);
        self.active.classList.add(`${self.className.main}__active`);
        self.list.classList.add(`${self.className.main}__list`);

        self.select.parentNode.insertBefore(self.wrapper, self.select);
        self.wrapper.appendChild(self.select);
        self.wrapper.appendChild(self.active);
        self.wrapper.appendChild(self.list);

        for (let i = 0; i < self.select.options.length; i++) {
            const item = self.select.options[i];
            const li = document.createElement('li');
            const btn = document.createElement('button');

            li.classList.add(`${self.className.main}__list-item`);
            btn.classList.add(`${self.className.main}__list-btn`);

            self.list.appendChild(li);
            li.appendChild(btn);
            btn.innerHTML = item.innerHTML;

            btn.addEventListener('click', () => {
                self.setActive(i);
            });
        }

        // change active option
        self.setActive();

        // show/hide native select
        if (self.isMobile()) {
            self.wrapper.classList.add(self.className.native);
        }

        // events
        self.select.addEventListener('change', () => {
            self.setActive();
        });

        self.active.addEventListener('click', (event) => {
            event.stopPropagation();
            self.wrapper.classList[self.wrapper.classList.contains(self.className.open) ? 'remove' : 'add'](self.className.open);
            document.body.addEventListener('click', close);

            function close() {
                self.wrapper.classList.remove(self.className.open);
                document.body.removeEventListener('click', close);
            }
        });
    }

    setActive(index) {
        const activeIndex = index ? index : this.select.selectedIndex;
        const items = this.list.children;

        // clear active class
        items[this.activeIndex].classList.remove(this.className.active);
        this.activeIndex = activeIndex;

        // change selected option if clicked on list item
        if (index) {
            this.select.selectedIndex = this.activeIndex;
        }

        // set new active option
        this.active.innerHTML = this.select.options[this.activeIndex].innerHTML;
        items[this.activeIndex].classList.add(this.className.active);
    }

    isMobile() {
        return this.mobile.any();
    }

    addEventListener(event, callback) {
        this.select.addEventListener(event, callback);
        return () => this.select.removeEventListener(event, callback);
    }
}

export default NJSelect;
