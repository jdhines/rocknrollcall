  Rocknrollcall.SongView = Ember.View.extend({
    didInsertElement: function() {
      $('#song-duration').text(function(){
        var $this = $(this),
            origSeconds = $this.attr('data-duration'),
            minutes = Math.floor(origSeconds/60),
            seconds = Math.floor(origSeconds % 60);
            return minutes + ':' + seconds;
      });
    }
  });