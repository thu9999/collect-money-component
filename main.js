const CONTENT_CLASSNAME = 'collected-content';

// Class defines a custom element
class CollectMoneyModal extends HTMLElement {

    constructor() {
        super();
        this.value = 1110;
        this.remain = 230;
        this.note = '';
    
    }

    /**
     * Browser calls this method when the element is added to the document
     */
    connectedCallback() {
        this.innerHTML = `
            <div class="collected-content">
                <div class="row">Thu tiền</div>
                <div class="row">
                    <div class="col-sm-6">Doanh thu: ${this.value}</div>
                    <div class="col-sm-6">Còn lại: ${this.remain}</div>
                </div>
        
                <div class="row">
                    <div class="col-sm-3">Note:</div>
                    <div class="col-sm-9">
                        <textarea id="note"></textarea>
                    </div>
                </div>
        
                <div class="row">
                    <button id="collect">Thu tiền</button>
                </div>
            </div>
        `

        this.setAttribute('class', 'modal-container');

        this.addEventListener('click', this.handleModalClick);

        const note = this.querySelector('#note');
        note.addEventListener('keyup', (e) => {
            this.note = e.target.value
        });

        const collectBtn = this.querySelector('#collect');
        collectBtn.addEventListener('click', () => {
            console.log(this.note);
        })
    }

    handleModalClick(event) {
        let closed = true;

        const paths = event.path;
        Array.from(paths).forEach(path => {
            let classes = Array.from(path.classList || []);
            classes.forEach(cl => {
                if(cl === CONTENT_CLASSNAME) {
                    closed = false;
                }
            })
        });

        if(closed) {
            const overlay = document.querySelector('#overlay');
            for(let node of overlay.childNodes) {
                overlay.removeChild(node)
            }
        }
    }

    /**
     * Browser calls this methods when the element is removed from the document
     */
    disconnectedCallback() {
        this.removeEventListener('click', this.handleModalClick);
    }
}

customElements.define('collect-money-modal', CollectMoneyModal);

function handleClick(id) {
    const modal = document.createElement('collect-money-modal');
    modal.setAttribute('dealFinId', id);
    const overlay = document.querySelector('#overlay');
    // Get all child element of overlay
    for(let node of overlay.childNodes) {
        overlay.removeChild(node)
    }
    overlay.appendChild(modal);
}
