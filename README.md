I think we need something along the lines of Machinist

* Setting up fixture data for use in tests (blueprints)
* JSON data sets
* code to deal with relationships
* need to look at how mocha-mongoose cleans up after itself (it wipes all the collections)
  * wipe/wipe all
  * function available to the Cucumber world so that we can wipe data in-between tests (for specific Models) or all tests
  * Model.remove() for specific models
    * Need to remove all known collections/models (wipe all)
