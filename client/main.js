import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Article = new Mongo.Collection("article");

// toastr Configuration (http://codeseven.github.io/toastr/demo.html)
// toastr.options.progressBar = true;
toastr.options.positionClass = "toast-bottom-full-width";

const handleIntent = function (intent) {
  let receivedText = intent.clipItems[0].text;
  let urlMatched = receivedText.match(/\bhttps?:\/\/\S+/gi)[0];
  console.log('URL Received: ', urlMatched);
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
    toastr.success('Succefully added new article.');
  } else {
    toastr.danger('Error loading article. No URL found.');
  }
};

// If users shares a link via another app
if (window.plugins) {
  window.plugins.intent.setNewIntentHandler(handleIntent);
  window.plugins.intent.getCordovaIntent(handleIntent);
}
