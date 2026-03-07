# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class CollegescraperItem(scrapy.Item):
    aicteId = scrapy.Field()
    name = scrapy.Field()
    courses = scrapy.Field()  # List of dicts
    source = scrapy.Field()
    lastUpdated = scrapy.Field()
