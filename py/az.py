from bs4 import BeautifulSoup
import requests
import re
import csv

page = requests.get("https://azsos.gov/county-election-info")
soup = BeautifulSoup(page.content, 'html.parser')

counties = soup.find_all(class_="nobs_collapse")

data = []
fails = []


def parse_p(p, type):
    res = {
        f"{type}_name": p[0],
        f"{type}_title": p[1],
        f"{type}_physical_address": "",
        f"{type}_mailing_address": "",
        f"{type}_city": "",
        f"{type}_state": "",
        f"{type}_zip": "",
        f"{type}_phone": "",
        f"{type}_fax": "",
        f"{type}_tdd": "",
        f"{type}_email": "",
        f"{type}_website": "",
    }
    physical = False
    index_adj = 0
    if "Physical" in p[2]:
        res[f"{type}_physical_address"] = p[2].replace("Physical: ", "")
        physical = True
        index_adj += 1
    if "Mailing" in p[3]:
        res[f"{type}_mailing_address"] = p[3].replace("Mailing: ", "")

    if not physical:
        res[f"{type}_physical_address"] = p[2]
    try:
        res[f"{type}_city"], res[f"{type}_state"], res[f"{type}_zip"] = re.match(r"([\w\s\.]+), (\w+) (\d{5})", p[3 + index_adj]).groups()
    except AttributeError:
        fails.append(p)
    res[f"{type}_phone"] = p[4 + index_adj].replace("Phone - ", "")
    res[f"{type}_fax"] = p[5 + index_adj].replace("Fax - ", "")

    if "tdd" in p[6 + index_adj]:
        res[f"{type}_tdd"] = p[6 + index_adj].replace("TDD - ", "")
    else:
        index_adj -= 1

    res[f"{type}_email"] = p[7 + index_adj].replace("Email - ", "")
    res[f"{type}_website"] = p[8 + index_adj].replace("Website ", "")

    return res


for county in counties:
    _body = county.select(".nobs_body")[0]
    try:
        recorder_p = _body.select("p:nth-of-type(3)")[0].text.replace("\t", "").split("\n")
        elections_p = _body.select("p:nth-of-type(4)")[0].text.replace("\t", "").split("\n")

        _data = {
            "name": county.h9.text,
            "website": _body.select("p:nth-of-type(2) a")[0].text if _body.select("p:nth-of-type(2) a") else None,
            # "county_recorder": parse_p(recorder_p),
            # "elections": parse_p(elections_p)

        }
        _data.update(parse_p(recorder_p, "recorder"))
        _data.update(parse_p(elections_p, "elections"))
        data.append(_data)
    except IndexError:
        pass

with open("py/az.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(data[0].keys())
    for county in data:
        writer.writerow(county.values())
