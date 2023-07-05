import {LitElement, html} from '../libs/lit-html.js';

export class TallyCount extends LitElement{
    static properties = {
        count: { type: Number },
        status: { type: String }
      };
    
      constructor() {
        super();
        this.count = 0;
        this.status = 'Normal';
      }
    
      incrementCount() {
        if (this.count < 10) {
          this.count++;
          this.updateStatus();
        }
      }
    
      decrementCount() {
        if (this.count > -10) {
          this.count--;
          this.updateStatus();
        }
      }

      resetCount() {
        this.count = 0;
        this.updateStatus();
      }
    
      updateStatus() {
        if (this.count === -10) {
          this.status = 'Minimum Reached';
        } else if (this.count === 10) {
          this.status = 'Maximum Reached';
        } else {
          this.status = 'Normal';
        }
      }
    
      render() {
        return html`
          <h1>Tally Count: ${this.count}</h1>
          <div class="status">Status: ${this.status}</div>
          <button @click="${this.incrementCount}">Increment</button>
          <button @click="${this.decrementCount}">Decrement</button>
          <button @click="${this.resetCount}">Reset</button>
        `;
      }
    }
    
    customElements.define('tally-count', TallyCount);