Rocknrollcall.SearchResultsRoute = Ember.Route.extend({
  model: function (query) {
    return Promise.all([
      Ember.$.getJSON("http://developer.echonest.com/api/v4/artist/search?api_key=8ZGHVRRD7DTSS2TZH&format=json&results=50&bucket=images&bucket=hotttnesss&bucket=biographies&bucket=id:musicbrainz",
        { name: query.term }),
      Ember.$.getJSON("http://developer.echonest.com/api/v4/song/search?api_key=8ZGHVRRD7DTSS2TZH&format=json&results=50&bucket=id:7digital-US&bucket=audio_summary&bucket=song_hotttnesss&bucket=tracks&bucket=song_type",
      { title: query.term })
    ]).then(function(jsonArray){
      var artistResults = jsonArray[0].response.artists,
        songResults = jsonArray[1].response.songs,
        artists = [],
        songs = [],
        i = 0, entry = null;

      for (i = 0; i < artistResults.length; i++) {
        entry = artistResults[i];
        artists.push(Rocknrollcall.Artist.create({
          id: i + 1,
          type: 'artist',
          name: entry.name,
          hotttnesss: entry.hotttnesss,
          enid: entry.id
        }));
      }

      entry = null;

      for (i = 0; i < songResults.length; i++) {
        entry = songResults[i];
        songs.push(Rocknrollcall.Song.create({
          id: i + 1,
          title: entry.title,
          enid: entry.id,
          type: 'song',
          artist_id: (entry.artist_id) ? entry.artist_id : null,
          artist_name: entry.artist_name,
          hotttnesss: entry.song_hotttnesss,
          audio_summary: entry.audio_summary
        }));
      }
      return {artists: artists, songs: songs};
    });

  }
});