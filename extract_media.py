import json
from bs4 import BeautifulSoup
import os

with open('index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

data = {
    "series": [],
    "mangas": [],
    "peliculas": [],
    "videojuegos": []
}

# Series
series_section = soup.find('section', id='serie')
if series_section:
    for card in series_section.find_all('div', class_='card'):
        title = card.find('h3').text.strip() if card.find('h3') else ''
        desc = card.find('p').text.strip() if card.find('p') else ''
        img = card.find('img')['src'] if card.find('img') else ''
        badge = card.find('span', class_='badge').text.strip() if card.find('span', class_='badge') else ''
        data["series"].append({"titulo": title, "descripcion": desc, "imagen": img, "info": badge})

# Mangas
mangas_section = soup.find('section', id='manga')
if mangas_section:
    for card in mangas_section.find_all('div', class_='card'):
        title = card.find('h3').text.strip() if card.find('h3') else ''
        desc = card.find('p').text.strip() if card.find('p') else ''
        img = card.find('img')['src'] if card.find('img') else ''
        data["mangas"].append({"titulo": title, "descripcion": desc, "imagen": img})

# Peliculas
peliculas_section = soup.find('section', id='peliculas')
if peliculas_section:
    for card in peliculas_section.find_all('div', class_='card'):
        title = card.find('h4').text.strip() if card.find('h4') else ''
        desc = card.find('p').text.strip() if card.find('p') else ''
        img = card.find('img')['src'] if card.find('img') else ''
        data["peliculas"].append({"titulo": title, "descripcion": desc, "imagen": img})

# Videojuegos
juegos_section = soup.find('section', id='videojuegos')
if juegos_section:
    for card in juegos_section.find_all('div', class_='card'):
        title = card.find('h3').text.strip() if card.find('h3') else ''
        desc = card.find('p').text.strip() if card.find('p') else ''
        img = card.find('img')['src'] if card.find('img') else ''
        data["videojuegos"].append({"titulo": title, "descripcion": desc, "imagen": img})

with open('api_media.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
