/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */



$((() => {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*   Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        for (feed of allFeeds) {
            it('url is defined and not empty', () => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        }


        /*   Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        for (feed of allFeeds) {
            it('name is defined and not empty', () => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        }

    });


    /*   Write a new test suite named "The menu" */
    describe('The menu', () => {
        /*   Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu is hidden by default', () => {
            expect($('body')[0].classList).toContain('menu-hidden');
        });
        /*   Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu show and hidden functional', () => {
            let menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body')[0].classList).not.toContain('menu-hidden');
            menuIcon.click();
            expect($('body')[0].classList).toContain('menu-hidden');            
        });
    });



    describe('Initial Entries', () => {
        /*   Write a new test suite named "Initial Entries" */

        /*   Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach((done) => {
            /* In order to test, I made a customer matcher for it 
             * The node which has a class of 'entry' will only possible
             * appear in the grandchild of the original node.
             * So here I check the grandchild which has a classList
             * and contains the 'entry' as class name.
             */
            jasmine.addMatchers({
                customerMatcher: () => {
                    return {
                        compare: (feedContainer) => {
                            let flag = false;
                            for (ele of feedContainer.childNodes) {
                                for (el of ele.childNodes) {
                                    if ((typeof el.classList!='undefined') && el.classList.contains('entry')) {
                                        flag = true;
                                    }
                                }
                            };
                            let result = {pass: flag};
                            if(result.pass) {
                                result.message = 'passed';
                            } else {
                                result.message = 'not passed';
                            }
                            return result;
                        }
                    }

                }
            })

            /* Ensures that loadFeed is called and finished before the 
             * test.
             */
            loadFeed(0, done);
        })

        it('loadFeed is working', () => {
            expect($('.feed')[0]).customerMatcher();
        })

    });

    describe('New Feed Selection', () => {
        /*   Write a new test suite named "New Feed Selection" */

        /*   Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let oldContent;
        let newContent;
        beforeEach((done) => {
            loadFeed(0, () => {
                oldContent = $('.feed').text();
                loadFeed(1, () => {
                    newContent = $('.feed').text();
                    done();
                })
            })
            
        });
        it('a new feed loaded changes', () => {
            expect(newContent).not.toBe(oldContent);
        });
    });
    
 
})());

