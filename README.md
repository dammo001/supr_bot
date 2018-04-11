# Supr Bot: Node.JS API Wrapper and Python Parser for [Supreme](https://www.supremenewyork.com)

## Python Web Scraper

### Technologies
[BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)  
[Selenium](https://www.seleniumhq.org/)  
[Requests](http://docs.python-requests.org/en/master/)  
[Time](https://docs.python.org/2/library/time.html)

### Installation
`pip install -r requirements.txt`

### Functions:

*Automated*
**extract_items** - parses main sales page and extracts item url and item ID of each item
**update_items** - calls *extract_items* by N interval, in seconds

*Manual*
**shop** - Adds all items to cart and clicks "checkout"

### To-Do List:
1. Test Selenium web driver
2. Automate *shop*. Decide at which interval, and whether we need to store results from *extract_items* multiple times for multiple *shop* calls... or only run *extract_items* as a callback function after each *shop* order.

### Node.JS API Wrapper

### Technologies
NPM 5.8.0

### To-Do List:
1. make smaller comparison file. 



