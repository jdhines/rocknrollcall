Rocknrollcall.ArtistRoute = Ember.Route.extend({
  model: function(params) {
    var url, obj;
    url = "http://developer.echonest.com/api/v4/artist/profile?api_key=8ZGHVRRD7DTSS2TZH&format=json&bucket=biographies&bucket=blogs&bucket=familiarity&bucket=hotttnesss&bucket=images&bucket=news&bucket=reviews&bucket=terms&bucket=urls&bucket=video&bucket=id:musicbrainz";
    obj = {"id": params.enid};

    return Ember.$.getJSON(url, obj)
      .then(function(data) {
        var entry = data.response.artist,
            bio = null,
            img = null,
            lastVideo = 4,
            videos = [],
            i;

        for (i = 0; i<entry.biographies.length;i++){
          if (entry.biographies[i].site.toLowerCase() == 'wikipedia') {
            bio = entry.biographies[i];
          }
        }

        if (!bio && entry.biographies.length) {
          bio = entry.biographies[0];
        }
        if (entry.images.length) {
          img = entry.images[0];
        }

        if (entry.video.length < 4) {
          lastVideo = entry.video.length;
        }

        for (i=0; i<lastVideo; i++) {
          videos.push(entry.video[i]);
        }

        return Rocknrollcall.Artist.create({
          enid: entry.id,
          name: entry.name,
          hotttnesss: entry.hotttnesss,
          biography: bio,
          image: img,
          videos: videos
        });
      });
    }
});