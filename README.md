# Supr Bot – Node.JS API Wrapper and Python Parser for [Supreme](https://www.supremenewyork.com)

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

## Node.JS API Wrapper

### Technologies
NPM 5.8.0

### To-Do List:
1. make smaller comparison file. 

<<<<<<< HEAD
#### How to use pybot.py

1. Install virtualenv
		A. If you do not have virtualenv:
			`pip install virtualenv`
		B. If you have virtualenv:
			Outside of 'supreme' directory run: `virtualenv envname`

2. Starting virtualenv
		outside your newly created virtual env directory run: `source envname/bin/activate`
		You should see (envname) to the left of your terminal line
		(type `deactivate` to exit the virtualenv)

3. Check Python version
		In your env, check you're on python3.

4. Installing Requirements
		Go to the supreme directory where `requirements.txt` is located
		run: `pip install -r requirements.txt`
		This installs all the packages/dependancies required for the bot

5. Run Bot
		`python pybot.py`

=======
## Collaborators: 
[David Ammons](https://github.com/dammo001)  
[Jonathan Tung](https://github.com/jtung23)  
[Shirley Xiaolin Xu](https://github.com/xiaolin-ninja)  
>>>>>>> 7d76cb4e0d582cf17454986294b1f549a76ff6a7
