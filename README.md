# Nkọwa okwu

To test:

1. Download Firefox Developer Edition from https://www.mozilla.org/en-GB/firefox/developer/ and install.  This version of Firefox will allow you to use an add-on that has not been published.
2. Download the test.xpi file from the repo (in each version folder).
3. Enter ```about:debugging``` in the address bar and select "This Firefox".
4. Select "Load Temporary Add-on..." and open the test.xpi file that you had downloaded.

What you should see happen in V1:

- The toolbar icon will open https://nkowaokwu.com/home.

- If you select some text on a web page and open the context menu ("right click"), you should see an option to search with Nkọwa okwu.  This will send that text to the search page and display a result.

- If you go to search using the address bar in Firefox, you will see Nkọwa okwu listed as an alternative search engine which will send the search term to https://nkowaokwu.com/home and display the search result.  Alternatively, type ```@test``` (this is a placeholder) and enter your search term directly.

What you should see happen in V2:

- The toolbar icon will open https://nkowaokwu.com/home.

- If you select some text on a web page and open the context menu ("right click"), you should see an option to search with Nkọwa okwu.  This will send that text to the search page and display a result.

- If you go to search using the address bar in Firefox, you will see Nkọwa okwu listed as an alternative search engine which will send the search term to https://nkowaokwu.com/home and display the search result.  Alternatively, type ```@test``` (this is a placeholder) and enter your search term directly.

- Double left click on a word for a translation to Igbo to be displayed.

Part of V2 have been forked from https://github.com/meetDeveloper/Dictionary-Anywhere
