/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it( 'are defined', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it( 'all urls are defined and not empty', function() {

            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it( 'all names are defined and not empty', function() {

            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* This test, tests the suite named "The menu"
    *  This suite is to ensure that the menu element
    *  is hidden by default and that the menu changes visibility when the menu
    *  icon is clicked.
    */
    describe('The Menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */

    it( 'should have menu element hidden by default by having class menu-hidden', function() {

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

    it( 'changes visibility when the menu icon clicked', function() {

            var menuIcon = $('.icon-list');

            /* menu is hidden at first, so simulate click
            * then, test for visibility*/
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            /*
            * simulate click again, then test again*/
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);

        });
    });

    /* Wrote a new test suite named "Initial Entries" */
    describe( 'Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Since loadFeed() is asynchronous this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
            beforeEach(function(done) {
                loadFeed(0, done);

            });

        it( 'has new entries', function() {

            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
     });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe( 'New Feed Selection', function() {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
            var firstFeed,
                newFeed;
                /* load intial feed */

            beforeEach(function(done) {

                loadFeed(0, function() {

                    firstFeed = $('.feed').find('h2').text();
                    done();

                });

            });

        it( 'should be new stuff', function(done) {

                loadFeed(1, function() {

                    newFeed = $('.feed').find('h2').text();
                    expect(firstFeed).not.toEqual(newFeed);
                    done();
                });
            });
        });
}());

