Rocknrollcall.ApplicationController = Ember.ObjectController.extend({
  searchTerms: '',
  applicationName: "Rock'n'Roll Call",
  actions: {
    submit: function() {
      this.transitionToRoute('search-results', this.get('searchTerms'));
    }
  }
});