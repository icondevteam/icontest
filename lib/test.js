'use babel';

import TestView from './test-view';
import { CompositeDisposable } from 'atom';

export default {

  testView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testView = new TestView(state.testViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testView.destroy();
  },

  serialize() {
    return {
      testViewState: this.testView.serialize()
    };
  },

  toggle() {
    console.log('Test was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
