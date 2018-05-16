import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Article = new Mongo.Collection("article");

// toastr Configuration (http://codeseven.github.io/toastr/demo.html)
// toastr.options.progressBar = true;
toastr.options.positionClass = "toast-bottom-full-width";

const handleIntent = function (intent) {
  console.log(intent);
  if (intent.clipItems && intent.clipItems[0].text) {
    let receivedText = intent.clipItems[0].text;
    importSharedUrl(receivedText);
  } else if (intent.extras && intent.extras['android.intent.extra.TEXT']) {
    let receivedText = intent.extras['android.intent.extra.TEXT'];
    importSharedUrl(receivedText);
  }
};

// If users shares a link via another app
if (window.plugins) {
  window.plugins.intent.setNewIntentHandler(handleIntent);
  window.plugins.intent.getCordovaIntent(handleIntent);
}

function importSharedUrl(receivedText) {
  let urlMatched = receivedText.match(/\bhttps?:\/\/\S+/gi)[0];
  if (urlMatched && urlMatched != '') {
    var article = Article.insert({
        url: urlMatched,
        meta: false,
        done: false,
        rating: 0,
        import: 'shared',
        createdOn: new Date(),
    });
    Meteor.call('getMeta', article)
  }
}
