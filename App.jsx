import React, { useState, useEffect, useRef } from 'react';
import { Search, Info, Leaf, Flame, Star, ChevronLeft, X, Globe, MapPin, Clock, Plus, Home, GlassWater, Salad, UtensilsCrossed, IceCream, ChevronDown } from 'lucide-react';

// --- DONNÉES DU RESTAURANT ---
const restaurantData = {
  name: "L'Olivier",
  subtitle: "Table Méditerranéenne & Bar à Vins",
  coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M45 90 C 45 70, 30 50, 20 40 M55 90 C 55 70, 70 50, 80 40 M50 90 V 40' stroke='%233f6212' stroke-width='6' stroke-linecap='round' fill='none'/><circle cx='50' cy='30' r='25' fill='%234d7c0f' opacity='0.95'/><circle cx='28' cy='48' r='20' fill='%2365a30d' opacity='0.95'/><circle cx='72' cy='48' r='20' fill='%233f6212' opacity='0.95'/></svg>",
  primaryColor: "emerald"
};

const menuData = [
  {
    id: "home",
    name: "Home",
    icon: Home,
    items: [
      { id: "pj1", title: "Plat du Jour : Filet de Bar", description: "Pêche locale, risotto au safran de Provence.", price: "19.50 €", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef", "populaire"], allergens: ["Poisson", "Lait"] },
      { id: "pj2", title: "Suggestion : Salade Niçoise", description: "Thon mi-cuit, œufs cailles, anchois, olives.", price: "16.00 €", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: ["Poisson", "Oeufs"] },
      { id: "pj3", title: "Entrée du Jour : Velouté Glacé", description: "Petits pois, menthe fraîche et pecorino.", price: "8.50 €", image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege", "leger"], allergens: ["Lait"] },
      { id: "pj4", title: "Dessert du Jour : Pavlova", description: "Meringue, chantilly et fruits rouges.", price: "9.50 €", image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Oeufs", "Lait"] },
      { id: "pj5", title: "Tartare de Bœuf Charolais", description: "Préparé au couteau, frites maison et salade.", price: "18.00 €", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Oeufs", "Moutarde"] },
      { id: "pj6", title: "Burger du Chef", description: "Pain brioché, tomme de brebis, confit d'oignons.", price: "17.50 €", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Gluten", "Lait"] },
      { id: "pj7", title: "Poke Bowl Saumon", description: "Riz vinaigré, mangue, edamame, avocat.", price: "15.50 €", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: ["Poisson", "Soja"] },
      { id: "pj8", title: "Tartelette aux Fraises", description: "Pâte sablée, crème pâtissière à la vanille.", price: "8.00 €", image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege"], allergens: ["Gluten", "Lait", "Oeufs"] }
    ]
  },
  {
    id: "boisson",
    name: "Boisson",
    icon: GlassWater,
    subcategories: [
      {
        id: "soft",
        name: "Soft",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "s1", title: "Limonade Artisanale", description: "Citrons frais pressés, sirop de canne.", price: "5.00 €", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "s2", title: "Coca-Cola / Zéro (33cl)", description: "Servi bien frais avec une tranche de citron.", price: "4.50 €", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "s3", title: "Thé Glacé Maison", description: "Infusion de thé noir, pêche et verveine.", price: "6.00 €", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: [] },
          { id: "s4", title: "Jus d'Orange Pressé", description: "Oranges de Sicile fraîchement pressées.", price: "5.50 €", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "s7", title: "Diabolo Menthe", description: "Limonade artisanale et sirop de menthe.", price: "4.50 €", image: "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "s8", title: "Kombucha Framboise", description: "Boisson pétillante naturellement fermentée.", price: "6.50 €", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: [] },
          { id: "s5", title: "Eau Perrier (33cl)", description: "Bouteille en verre, fines bulles fraîches.", price: "4.00 €", image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "s6", title: "Eau Plate Evian (50cl)", description: "Eau minérale naturelle des Alpes.", price: "3.50 €", image: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] }
        ]
      },
      {
        id: "cocktail",
        name: "Cocktail",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "c1", title: "Sex on the Beach", description: "Vodka, liqueur de pêche, orange, canneberge.", price: "12.00 €", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: [] },
          { id: "c2", title: "Mojito Classique", description: "Rhum blanc, citron vert, menthe, eau gazeuse.", price: "10.00 €", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "c3", title: "Negroni Sbagliato", description: "Campari, Vermouth rouge, Prosecco.", price: "13.00 €", image: "https://images.unsplash.com/photo-1551028150-64b9f398f678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Sulfites"] },
          { id: "c4", title: "Margarita Exotique", description: "Tequila, Cointreau, citron vert, sirop d'agave.", price: "12.50 €", image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "c5", title: "Virgin Pina Colada", description: "Ananas frais, crème de coco, sirop de canne.", price: "9.00 €", image: "https://images.unsplash.com/photo-1595981234058-a9302fc97ce1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Lait"] },
          { id: "c6", title: "Bora Bora", description: "Jus d'ananas, passion, citron, grenadine.", price: "8.50 €", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "c7", title: "Shirley Temple", description: "Ginger ale, sirop de grenadine, cerise confite.", price: "8.00 €", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "c8", title: "Virgin Mojito", description: "Menthe fraîche, citron vert, limonade.", price: "8.50 €", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: [] }
        ]
      },
      {
        id: "vins",
        name: "Vins",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "v1", title: "Château Minuty Prestige", description: "Rosé - AOC Côtes de Provence.", price: "8€ | 38€", image: "https://images.unsplash.com/photo-1553119106-963c63142756?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Sulfites"] },
          { id: "v2", title: "Whispering Angel", description: "Rosé - Caves d'Esclans.", price: "9€ | 45€", image: "https://images.unsplash.com/photo-1558001373-1b11af485144?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Sulfites"] },
          { id: "v3", title: "Puech-Haut Argali", description: "Rosé - Languedoc AOC.", price: "7€ | 32€", image: "https://images.unsplash.com/photo-1594488311340-9759392e2764?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Sulfites"] },
          { id: "v4", title: "Miraval", description: "Rosé - Côtes de Provence.", price: "9€ | 42€", image: "https://images.unsplash.com/photo-1562601579-599dec564e06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Sulfites"] },
          { id: "v5", title: "Saint-Émilion Grand Cru", description: "Rouge - Château Fombrauge.", price: "11€ | 52€", image: "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Sulfites"] },
          { id: "v6", title: "Pinot Noir Bourgogne", description: "Rouge - Domaine Bouchard.", price: "9€ | 45€", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Sulfites"] },
          { id: "v7", title: "Châteauneuf-du-Pape", description: "Rouge - Domaine du Vieux Télégraphe.", price: "14€ | 65€", image: "https://images.unsplash.com/photo-1553361371-9bb220263c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Sulfites"] },
          { id: "v8", title: "Crozes-Hermitage", description: "Rouge - Maison Chapoutier.", price: "8€ | 39€", image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Sulfites"] },
          { id: "v9", title: "Chablis 1er Cru", description: "Blanc - Domaine Louis Michel.", price: "10€ | 48€", image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Sulfites"] },
          { id: "v10", title: "Sancerre Blanc", description: "Blanc - Domaine Vacheron.", price: "11€ | 52€", image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Sulfites"] },
          { id: "v11", title: "Viognier IGP", description: "Blanc - Collines Rhodaniennes.", price: "7€ | 34€", image: "https://images.unsplash.com/photo-1528823331199-6996484c146e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Sulfites"] },
          { id: "v12", title: "Pouilly-Fuissé", description: "Blanc - Chardonnay de Bourgogne.", price: "12€ | 58€", image: "https://images.unsplash.com/photo-1544436524-74078891584d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Sulfites"] }
        ]
      },
      {
        id: "spiritueux",
        name: "Spiritueux",
        image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "sp1", title: "Nikka From The Barrel", description: "Japon - Puissant et fruité.", price: "16.00 €", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: [] },
          { id: "sp2", title: "Lagavulin 16 ans", description: "Écosse - Islay Single Malt, fumé.", price: "18.00 €", image: "https://images.unsplash.com/photo-1582819509237-45b754223abd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: [] },
          { id: "sp3", title: "Jack Daniel's Single Barrel", description: "USA - Tennessee Whiskey premium.", price: "14.00 €", image: "https://images.unsplash.com/photo-1508253730747-e833c1a3f697?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "sp4", title: "The Macallan 12 ans", description: "Écosse - Élevé en fûts de Sherry.", price: "20.00 €", image: "https://images.unsplash.com/photo-1598901963503-49d799f928e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "sp5", title: "Don Papa 7 ans", description: "Philippines - Notes de vanille.", price: "14.00 €", image: "https://images.unsplash.com/photo-1614316142144-88771a39d8fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: [] },
          { id: "sp6", title: "Diplomático Reserva", description: "Venezuela - Riche et complexe.", price: "15.00 €", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "sp7", title: "Zacapa Centenario 23", description: "Guatemala - Vieilli en altitude.", price: "17.00 €", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: [] },
          { id: "sp8", title: "Clément XO", description: "Martinique - Rhum agricole vieux.", price: "16.00 €", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "sp9", title: "Belvedere Pure", description: "Pologne - Seigle de qualité.", price: "14.00 €", image: "https://images.unsplash.com/photo-1620021319349-813d3129486c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: [] },
          { id: "sp10", title: "Grey Goose", description: "France - Blé de Picardie.", price: "15.00 €", image: "https://images.unsplash.com/photo-1619623831825-978189617260?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "sp11", title: "Beluga Noble", description: "Russie - Malt et eau artésienne.", price: "16.00 €", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: [] },
          { id: "sp12", title: "Absolut Elyx", description: "Suède - Distillée en alambic de cuivre.", price: "13.00 €", image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] }
        ]
      }
    ]
  },
  {
    id: "entrees",
    name: "Entrées",
    icon: Salad,
    subcategories: [
      {
        id: "partager",
        name: "À partager",
        image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "e1", title: "Planche Mixte", description: "Charcuterie fine et fromages affinés.", price: "18.00 €", image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Lait", "Gluten"] },
          { id: "e2", title: "Tapenade Maison", description: "Olives noires, câpres, servis avec croûtons.", price: "7.50 €", image: "https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege"], allergens: ["Gluten"] },
          { id: "e3", title: "Accras de Morue", description: "Recette traditionnelle, sauce pimentée.", price: "9.00 €", image: "https://images.unsplash.com/photo-1529692236671-f1f6e9463b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Poisson", "Gluten"] },
          { id: "e4", title: "Focaccia Romarin", description: "Pain italien maison, huile d'olive vierge.", price: "6.50 €", image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege"], allergens: ["Gluten"] }
        ]
      },
      {
        id: "froides",
        name: "Entrée froide",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "e5", title: "Ceviche de Daurade", description: "Mangue, yuzu et lait de tigre.", price: "14.00 €", image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: ["Poisson"] },
          { id: "e6", title: "Burrata Crémeuse", description: "Tomates d'antan et pesto de basilic.", price: "13.50 €", image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire", "vege"], allergens: ["Lait"] },
          { id: "e7", title: "Carpaccio de Bœuf", description: "Copeaux de parmesan et roquette.", price: "14.50 €", image: "https://images.unsplash.com/photo-1544025162-8e0ce997e5ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Lait"] },
          { id: "e8", title: "Gaspacho de Tomates", description: "Fraîcheur de basilic et pignons de pin.", price: "8.50 €", image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege", "leger"], allergens: ["Fruits à coque"] }
        ]
      },
      {
        id: "chaudes",
        name: "Entrée chaude",
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "e9", title: "Escargots (x6)", description: "Beurre persillé à l'ail doux.", price: "12.00 €", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Mollusques", "Lait"] },
          { id: "e10", title: "Camembert Rôti", description: "Au miel de Provence et thym frais.", price: "11.50 €", image: "https://images.unsplash.com/photo-1631481615555-f85959141f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Lait"] },
          { id: "e11", title: "Gambas Snackées", description: "Flambées au Pastis et herbes de Provence.", price: "15.00 €", image: "https://images.unsplash.com/photo-1559564101-8fbcf78d789c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Crustacés"] },
          { id: "e12", title: "Soupe à l'Oignon", description: "Gratinée au Gruyère et croûtons dorés.", price: "10.00 €", image: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Lait", "Gluten"] }
        ]
      },
      {
        id: "salades",
        name: "Salade",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "e13", title: "Salade César", description: "Poulet croustillant, sauce anchois, Grana Padano.", price: "16.50 €", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Gluten", "Lait", "Oeufs"] },
          { id: "e14", title: "Salade Chèvre Chaud", description: "Toasts miel, noix, mesclun, pommes.", price: "15.00 €", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege"], allergens: ["Lait", "Gluten", "Fruits à coque"] },
          { id: "e15", title: "Poke Bowl Saumon", description: "Edamame, avocat, riz vinaigré, sésame.", price: "17.00 €", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: ["Poisson", "Sésame"] },
          { id: "e16", title: "Salade Grecque", description: "Feta, olives Kalamata, concombre, origan.", price: "14.50 €", image: "https://images.unsplash.com/photo-1540432797114-187727afd19b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege"], allergens: ["Lait"] }
        ]
      }
    ]
  },
  {
    id: "plat",
    name: "Plat",
    icon: UtensilsCrossed,
    subcategories: [
      {
        id: "viande",
        name: "Viande",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "pl1", title: "Filet de Bœuf (200g)", description: "Sauce poivre vert et pommes grenailles.", price: "28.50 €", image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Lait"] },
          { id: "pl2", title: "Magret de Canard", description: "Au miel de Provence et légumes rôtis.", price: "26.00 €", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: [] },
          { id: "pl3", title: "Tartare de Bœuf", description: "Coupé au couteau, frites maison.", price: "18.50 €", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Oeufs"] },
          { id: "pl4", title: "Burger Signature", description: "Cheddar, bacon croustillant et sauce secrète.", price: "19.50 €", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Gluten", "Lait"] }
        ]
      },
      {
        id: "mer",
        name: "Fruit de mer",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "pl5", title: "Poulpe Grillé", description: "Snacké à la plancha, purée de patate douce.", price: "24.00 €", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Mollusques"] },
          { id: "pl6", title: "Dos de Cabillaud", description: "Croûte d'herbes et fondue de poireaux.", price: "23.50 €", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: ["Poisson"] },
          { id: "pl7", title: "Gambas Flambées", description: "Au Pastis, servies avec riz safrané.", price: "25.00 €", image: "https://images.unsplash.com/photo-1559564101-8fbcf78d789c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Crustacés"] },
          { id: "pl8", title: "Thon Mi-Cuit", description: "En croûte de sésame, wok de légumes.", price: "22.00 €", image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: ["Poisson", "Sésame"] }
        ]
      },
      {
        id: "pates",
        name: "Pâtes",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "pl9", title: "Risotto Truffe", description: "Crème de truffe noire et parmesan.", price: "22.00 €", image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege"], allergens: ["Lait"] },
          { id: "pl10", title: "Ravioles du Chef", description: "Farcies aux cèpes, éclat de noisettes.", price: "18.50 €", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Gluten", "Lait"] },
          { id: "pl11", title: "Linguine Vongole", description: "Palourdes fraîches, ail, persil et vin blanc.", price: "21.00 €", image: "https://images.unsplash.com/photo-1595293444465-1d4dbb6eb3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Mollusques", "Gluten"] },
          { id: "pl12", title: "Penne Pesto", description: "Basilic frais et pignons de pin torréfiés.", price: "16.00 €", image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege"], allergens: ["Gluten", "Fruits à coque"] }
        ]
      },
      {
        id: "salades-plats",
        name: "Salade",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "pl13", title: "Salade César Royale", description: "Poulet grillé, œuf poché et croûtons.", price: "18.00 €", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Gluten", "Lait", "Oeufs"] },
          { id: "pl14", title: "Poke Saumon Plaisir", description: "Avocat, fèves de soja, mangue et sésame.", price: "17.50 €", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: ["Poisson", "Soja", "Sésame"] },
          { id: "pl15", title: "Salade Folle", description: "Foie gras maison et magret fumé.", price: "21.00 €", image: "https://images.unsplash.com/photo-1595293444465-1d4dbb6eb3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Gluten"] },
          { id: "pl16", title: "Super Green Salad", description: "Légumes verts de saison et graines de chia.", price: "16.50 €", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["vege", "leger"], allergens: [] }
        ]
      }
    ]
  },
  {
    id: "dessert",
    name: "Dessert",
    icon: IceCream,
    subcategories: [
      {
        id: "patisserie",
        name: "Pâtisserie",
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "d1", title: "Tiramisu au Limoncello", description: "Biscuit cuillère et crème mascarpone.", price: "9.00 €", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Gluten", "Lait", "Oeufs"] },
          { id: "d2", title: "Moelleux Chocolat Noir", description: "Cœur coulant et glace vanille.", price: "10.00 €", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Gluten", "Lait", "Oeufs"] },
          { id: "d3", title: "Crème Brûlée", description: "À la gousse de vanille Bourbon.", price: "8.50 €", image: "https://images.unsplash.com/photo-1472555794301-8bacbc48dbbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Lait", "Oeufs"] },
          { id: "d4", title: "Tarte au Citron Meringuée", description: "Pâte sablée et crème acidulée.", price: "9.50 €", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Gluten", "Lait", "Oeufs"] }
        ]
      },
      {
        id: "glace",
        name: "Glace",
        image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "d8", title: "Coupe Glacée Artisanale", description: "3 boules au choix et chantilly.", price: "8.00 €", image: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: ["Lait"] },
          { id: "d9", title: "Dame Blanche", description: "Glace vanille, chocolat chaud et chantilly.", price: "9.50 €", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Lait"] },
          { id: "d10", title: "Café Liégeois", description: "Glace café, espresso et chantilly.", price: "10.00 €", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Lait"] },
          { id: "d11", title: "Sorbet Fraîcheur", description: "Assortiment de 3 sorbets plein fruit.", price: "7.50 €", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["leger"], allergens: [] }
        ]
      },
      {
        id: "cafe-mignardise",
        name: "Café & Mignardise",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "d14", title: "Expresso Premium", description: "Grain de torréfaction locale.", price: "2.50 €", image: "https://images.unsplash.com/photo-1510707513152-524626833cf3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "d5", title: "Café Gourmand", description: "Espresso avec 3 mignardises du Chef.", price: "11.00 €", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: ["Gluten", "Lait", "Oeufs"] },
          { id: "d15", title: "Décaféiné", description: "Arôme riche, sans caféine.", price: "2.80 €", image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "d13", title: "Capuccino", description: "Mousse de lait onctueuse et cacao.", price: "5.50 €", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Lait"] },
          { id: "m1", title: "Macarons Maison", description: "Assortiment de 3 parfums de saison.", price: "6.00 €", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Oeufs", "Fruits à coque"] },
          { id: "m2", title: "Mignardises du Chef", description: "Sélection de petites douceurs.", price: "7.50 €", image: "https://images.unsplash.com/photo-1582231371210-6fa3065c3127?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: ["Gluten", "Lait"] },
          { id: "ch1", title: "Chocolat Chaud", description: "Chocolat noir fondu et lait entier.", price: "6.50 €", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: ["Lait"] },
          { id: "d12", title: "Thé Sélection", description: "Sélection de thés noirs, verts ou infusions.", price: "5.00 €", image: "https://images.unsplash.com/photo-1594631252845-29fc4586db52?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] }
        ]
      },
      {
        id: "digestif",
        name: "Digestif",
        image: "https://images.unsplash.com/photo-1536394481177-337587bc82c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        items: [
          { id: "sp13", title: "Get 27 / 31", description: "La célèbre liqueur de menthe.", price: "8.00 €", image: "https://images.unsplash.com/photo-1536394481177-337587bc82c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["populaire"], allergens: [] },
          { id: "sp14", title: "Limoncello Maison", description: "Servi glacé en fin de repas.", price: "7.00 €", image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] },
          { id: "sp15", title: "Cognac VSOP", description: "Notes boisées et ambrées.", price: "12.00 €", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: ["chef"], allergens: [] },
          { id: "sp16", title: "Grappa di Moscato", description: "Eaux-de-vie fine d'Italie.", price: "10.00 €", image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tags: [], allergens: [] }
        ]
      }
    ]
  }
];

const ProductCard = ({ item, onClick, toggleFavorite, isFavorite }) => (
  <div 
    onClick={() => onClick(item)}
    className="bg-white rounded-2xl shadow flex flex-col cursor-pointer active:scale-95 transition-transform overflow-hidden relative group border border-stone-100 aspect-square"
  >
    <div className="relative h-[70%] w-full bg-stone-100 shrink-0">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <button 
        onClick={(e) => toggleFavorite(e, item.id)}
        className={`absolute bottom-2 right-2 w-7 h-7 rounded-full shadow flex items-center justify-center transition-colors z-10 ${isFavorite ? 'bg-amber-50 text-amber-400' : 'bg-white/90 backdrop-blur-sm text-stone-300 hover:text-amber-400'}`}
      >
        <Star size={14} strokeWidth={2.5} className={isFavorite ? "fill-amber-400" : ""} />
      </button>
    </div>
    <div className="h-[30%] px-2.5 flex flex-col justify-center bg-white w-full">
      <div className="flex justify-between items-center w-full gap-2 mb-0.5">
        <h3 className="font-bold text-stone-900 text-xs leading-tight truncate">{item.title}</h3>
        <span className="text-emerald-700 text-xs font-black shrink-0">{item.price}</span>
      </div>
      <p className="text-stone-500 text-[10px] leading-tight truncate w-full">{item.description}</p>
    </div>
  </div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const activeBtn = document.getElementById(`nav-${activeCategory}`);
      if (activeBtn) {
        const containerWidth = navRef.current.offsetWidth;
        const scrollPosition = activeBtn.offsetLeft - (containerWidth / 2) + (activeBtn.offsetWidth / 2);
        navRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [activeCategory]);

  const changeTab = (id) => {
    setActiveCategory(id);
    setExpandedCategories([]);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const activeCatData = menuData.find(cat => cat.id === activeCategory);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const toggleAccordion = (id) => {
    const isOpening = !expandedCategories.includes(id);
    setExpandedCategories(isOpening ? [id] : []);
    if (isOpening) {
      setTimeout(() => {
        const el = document.getElementById(`accordion-${id}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 76;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 250);
    }
  };

  const renderTags = (tags) => tags.map(tag => {
    switch(tag) {
      case 'vege': return <span key={tag} className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"><Leaf size={12} /> Végé</span>;
      case 'populaire': return <span key={tag} className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full"><Star size={12} className="fill-amber-600" /> Populaire</span>;
      case 'chef': return <span key={tag} className="flex items-center gap-1 text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full"><Flame size={12} /> Signature</span>;
      default: return null;
    }
  });

  const separators = {
    soft: { 6: 'Eau' },
    cocktail: { 4: 'Sans alcool' },
    vins: { 0: 'Vins Rosé', 4: 'Vins Rouge', 8: 'Vins Blanc' },
    spiritueux: { 0: 'Whisky', 4: 'Rhum', 8: 'Vodka' },
    'cafe-mignardise': { 4: 'Mignardise', 6: 'Chaud' }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 relative">
      
      {/* HERO */}
      <div className={`relative w-full transition-all duration-500 ${activeCategory === 'home' ? 'h-40' : 'h-16'}`}>
        <img src={restaurantData.coverImage} alt="Cover" className={`w-full h-full object-cover transition-opacity duration-500 ${activeCategory === 'home' ? 'opacity-90' : 'opacity-0'}`} />
        <div className="absolute top-4 right-4">
          <button onClick={() => setShowFavorites(true)} className="relative p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-600 shadow border border-stone-100">
            <Star size={20} className={favorites.length > 0 ? "fill-amber-400 text-amber-400" : ""} />
            {favorites.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{favorites.length}</span>}
          </button>
        </div>
        <div className="absolute -bottom-10 w-full flex justify-center">
          <img src={restaurantData.logo} alt="Logo" className="w-24 h-24 rounded-full border-4 border-stone-50 shadow object-contain bg-white z-10 p-2" />
        </div>
      </div>

      <div className="pt-14 pb-6 px-4 text-center">
        <h1 className="text-2xl font-bold text-stone-900">{restaurantData.name}</h1>
        <p className="text-sm text-stone-500 mt-1">{restaurantData.subtitle}</p>
      </div>

      {/* STICKY HEADER */}
      <div className={`fixed top-0 left-0 right-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/20 transition-all duration-500 flex items-center justify-between px-4 h-16 ${isScrolled ? 'translate-y-0 opacity-100 shadow-sm' : '-translate-y-full opacity-0'}`}>
        <div className="w-10" />
        <button onClick={() => changeTab('home')} className="flex items-center justify-center">
          <img src={restaurantData.logo} alt="Accueil" className="w-11 h-11 rounded-full object-contain bg-white shadow border border-stone-100" />
        </button>
        <button onClick={() => setShowFavorites(true)} className="relative w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
          <Star size={18} className={favorites.length > 0 ? "fill-amber-400 text-amber-400" : ""} />
          {favorites.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{favorites.length}</span>}
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-2 max-w-3xl mx-auto pb-40 min-h-screen">
        {activeCatData && (
          <div key={activeCatData.id}>
            {activeCatData.items && !activeCatData.subcategories && (
              <>
                <h2 className="text-xl font-bold mb-4 text-stone-900 flex items-center gap-3">
                  <div className="p-2 bg-stone-200/50 rounded-lg text-emerald-700"><activeCatData.icon size={20} /></div>
                  {activeCatData.name === 'Home' ? 'Plats du jour & Suggestions' : activeCatData.name}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {activeCatData.items.map(item => <ProductCard key={item.id} item={item} onClick={setSelectedItem} toggleFavorite={toggleFavorite} isFavorite={favorites.includes(item.id)} />)}
                </div>
              </>
            )}

            {activeCatData.subcategories && (
              <>
                <h2 className="text-xl font-bold mb-4 text-stone-900 flex items-center gap-3">
                  <div className="p-2 bg-stone-200/50 rounded-lg text-emerald-700"><activeCatData.icon size={20} /></div>
                  {activeCatData.name}
                </h2>
                <div className="grid grid-cols-4 gap-2 mb-8">
                  {activeCatData.subcategories.map(sub => (
                    <div key={`top-${sub.id}`} onClick={() => toggleAccordion(sub.id)} className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform">
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-2 shadow bg-stone-100">
                        <img src={sub.image} alt={sub.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                      </div>
                      <span className="text-[10px] font-bold text-stone-800 text-center uppercase tracking-wider w-full truncate px-1">{sub.name}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {activeCatData.subcategories.map(sub => (
                    <div key={`accordion-${sub.id}`} id={`accordion-${sub.id}`} className="bg-white rounded-2xl shadow overflow-hidden">
                      <button onClick={() => toggleAccordion(sub.id)} className="w-full px-5 py-4 flex items-center justify-between font-bold text-stone-900">
                        <span className="text-lg">{sub.name}</span>
                        <ChevronDown size={20} className={`text-stone-400 transition-transform duration-300 ${expandedCategories.includes(sub.id) ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCategories.includes(sub.id) ? "max-h-[5000px] opacity-100 pb-5 px-4" : "max-h-0 opacity-0 px-4 overflow-hidden"}`}>
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100">
                          {sub.items.map((item, index) => (
                            <React.Fragment key={item.id}>
                              {separators[sub.id] && separators[sub.id][index] && (
                                <div className="col-span-2 flex items-center gap-4 my-4">
                                  <div className="h-px flex-1 bg-stone-200" />
                                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-stone-400">{separators[sub.id][index]}</h4>
                                  <div className="h-px flex-1 bg-stone-200" />
                                </div>
                              )}
                              <ProductCard item={item} onClick={setSelectedItem} toggleFavorite={toggleFavorite} isFavorite={favorites.includes(item.id)} />
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <div ref={navRef} className="pointer-events-auto flex overflow-x-auto items-center p-2 rounded-full bg-stone-200/90 backdrop-blur-2xl border border-stone-300 shadow-xl max-w-full" style={{scrollbarWidth:'none'}}>
          {menuData.map(category => (
            <button key={category.id} id={`nav-${category.id}`} onClick={() => changeTab(category.id)}
              className={`shrink-0 flex items-center justify-center p-4 rounded-full transition-all duration-300 mx-1 ${activeCategory === category.id ? 'bg-white shadow scale-100' : 'text-stone-600 scale-95'}`}
            >
              <category.icon size={24} className={activeCategory === category.id ? "text-emerald-600" : ""} />
            </button>
          ))}
        </div>
      </div>

      {/* MODAL DÉTAIL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-900/60 backdrop-blur-sm sm:p-4">
          <div className="bg-white w-full sm:max-w-md h-[85vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md text-stone-800 rounded-full shadow">
              <X size={18} />
            </button>
            <div className="overflow-y-auto flex-1 bg-stone-100 relative" style={{scrollbarWidth:'none'}}
              onScroll={(e) => {
                const img = document.getElementById('modal-parallax-img');
                if (img) img.style.transform = `translateY(${e.target.scrollTop * 0.4}px)`;
              }}>
              <div className="relative h-72 w-full shrink-0 overflow-hidden bg-stone-200">
                <img id="modal-parallax-img" src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover origin-top" />
              </div>
              <div className="bg-white p-6 relative z-10 rounded-t-3xl -mt-6 shadow min-h-[50vh]">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-stone-900 pr-4">{selectedItem.title}</h2>
                  <span className="text-xl font-bold text-emerald-800 whitespace-nowrap">{selectedItem.price}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">{renderTags(selectedItem.tags)}</div>
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">À propos</h4>
                  <p className="text-stone-600 leading-relaxed">{selectedItem.description}</p>
                </div>
                {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 mb-6">
                    <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-2"><Info size={16} className="text-amber-500" />Allergènes</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.allergens.map(a => <span key={a} className="text-xs text-stone-600 bg-white border border-stone-200 px-2 py-1 rounded-md">{a}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-stone-100 bg-white shrink-0">
              <button onClick={() => setSelectedItem(null)} className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl active:scale-95 transition-transform">Retour au menu</button>
            </div>
          </div>
        </div>
      )}

      {/* FAVORIS */}
      {showFavorites && (
        <div className="fixed inset-0 z-[60] bg-stone-50 overflow-y-auto pb-20">
          <div className="sticky top-0 bg-white/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-stone-200 z-10 shadow-sm">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2"><Star className="fill-amber-400 text-amber-400" size={24} /> Mes Favoris</h2>
            <button onClick={() => setShowFavorites(false)} className="p-2 bg-stone-100 rounded-full text-stone-600"><X size={20} /></button>
          </div>
          <div className="p-4 max-w-3xl mx-auto space-y-8 mt-4">
            {favorites.length === 0 ? (
              <div className="text-center text-stone-500 mt-20 flex flex-col items-center">
                <Star size={48} className="text-stone-300 mb-4" strokeWidth={1} />
                <p>Pas encore de favoris.</p>
                <p className="text-sm mt-2">Appuyez sur l'étoile d'un plat pour l'ajouter ici !</p>
              </div>
            ) : menuData.map(category => {
              let items = [];
              if (category.items) items = category.items;
              else if (category.subcategories) category.subcategories.forEach(sub => items = [...items, ...sub.items]);
              const favItems = items.filter(item => favorites.includes(item.id));
              if (!favItems.length) return null;
              return (
                <div key={`fav-${category.id}`}>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-stone-800"><category.icon size={18} className="text-emerald-700" /> {category.name}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {favItems.map(item => <ProductCard key={`fav-${item.id}`} item={item} onClick={setSelectedItem} toggleFavorite={toggleFavorite} isFavorite={true} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-8 mb-32 flex flex-col items-center text-xs text-stone-400">
        <p className="mb-2">Menu digital propulsé par</p>
        <div className="flex items-center gap-2 font-bold text-stone-700 bg-stone-200/50 px-4 py-2 rounded-full border border-stone-200/60 shadow-sm">
          <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center">
            <span className="text-[9px] text-white tracking-wider">L</span>
          </div>
          <span>Lyxium</span>
        </div>
      </div>

      <style>{`
        * { -ms-overflow-style: none; scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
