# import xml.etree.ElementTree as ET
#
# tree = ET.parse('co.xml/co.xml')
# root = ET.parse('co.xml/co.xml').getroot()
# document = list(root)[0]
# folder = list(document)[-1]
# placemarks = list(folder)
# boxes = []
# for placemark in placemarks:
#     box = {
#         "name": "",
#
#     }

import xmltodict
import csv
with open('co.xml/co.xml') as file:
    data = file.read()

x = xmltodict.parse(data)
placemarks = x['Folder']['Placemark']
boxes = [{
    "name": p['name'],
    "county": p["ExtendedData"]["Data"][0]["value"],
    "address": p["ExtendedData"]["Data"][5]["value"],
    "city":p["ExtendedData"]["Data"][6]["value"],
    "state": p["ExtendedData"]["Data"][7]["value"],
    "zip":p["ExtendedData"]["Data"][8]["value"],
    "lat":p["ExtendedData"]["Data"][9]["value"],
    "lng":p["ExtendedData"]["Data"][10]["value"],
    "hrs": "; ".join([
        h['value'] for h in p["ExtendedData"]["Data"][1:4]
    ]),
    "hour_flag": any(["24" not in h['value'] for h in p["ExtendedData"]["Data"][1:4]])
} for p in placemarks]

with open("py/co.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile, delimiter=",", quotechar="`", quoting=csv.QUOTE_MINIMAL)
    writer.writerow(boxes[0].keys())
    for box in boxes:
        writer.writerow(box.values())