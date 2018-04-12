from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import time

# ------------------------------------------------- #

# I'm using Python3. If using Python 2.x, remove the parenthesis around print statements

# SELENIUM MODULE #

def shop(url):
	"""Adds items that are not sold out to the cart"""
	items = extract_items(url)
	browser = webdriver.Firefox()
	for item in items:
		link = "https://www.supremenewyork.com{}".format(item[0])
		print(link)
		browser.get(link)
		button = browser.find_element_by_xpath("//input[@value='add to cart']")
		print('found item {} in stock!'.format(item[1]))
		button.click()

	# COMMENT THESE 2 LINES OUT DURING TESTING
	checkout = browser.find_element_by_class_name('checkout')
	checkout.click()

# WEB SCRAPERS #

# COMMENT THIS OUT DURING TESTING #
def update_items(url):
	"""Runs web scraper to get list of items for sale every 60 minutes (360 sec)"""
	while True:
		extract_items(url)
		time.sleep(360)

def extract_items(url):
	"""Find items from supreme shop all page
	Returns list of tuples.
	tuple[0] = '/shop/bags/bg6jf4l0s/xi689n0dc'
			   Supreme item route
	tuple[1] = 'A/B' where A = item id, B = color id
	"""
	page = requests.get(url)
	soup = BeautifulSoup(page.content, 'html.parser')
	items = soup.find_all('div', attrs={'class': 'inner-article'})
	hrefs = set()
	for item in items:
		link = item.find('a')['href']
		# item_id looks like 'item_id/color_id'
		item_id = ('/').join(link.split('/')[-2:])
		hrefs.update((link, item_id))

	print(hrefs)
	return hrefs

# ------------------------------------------------- #

url = 'https://www.supremenewyork.com/shop/all'

items = extract_items(url)

ORDERS = {}

shop(url)

