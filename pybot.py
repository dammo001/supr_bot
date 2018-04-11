from lxml import html
import requests
from lxml import etree

def text_tail(node):
    yield node.text
    yield node.tail

url='https://www.supremenewyork.com/shop/all'

response = requests.get(url) #get page data from server, block redirects
sourceCode = response.content #get string of source code from response
htmlElem = html.document_fromstring(sourceCode) #make HTML element object

listClass =  htmlElem.find_class('inner-article')
for elem in listClass:
	# print(elem.attrib)
	stringelem = html.tostring(elem)
	# print(stringelem)
	# print(html.tostring(elem.xpath('//a')))
	# print(elem.xpath('//a')[0].get('href'))



# doc=lh.parse(urllib.request.urlopen(url).read())
# tree = etree.fromstring(doc)
# for elem in tree.xpath('/html/body/div/div//article'):
# 	print(etree.tostring(elem, pretty_print=True))




