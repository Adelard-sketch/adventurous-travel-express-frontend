// Multi-language translation system
const translations = {
  en: {
    // Top Header
    'currency': 'Currency',
    'dashboard': 'Dashboard',
    'help': 'Help',
    'register': 'Register',
    'signin': 'Sign in',
    
    // Navigation
    'home': 'Home',
    'stays': 'Stays',
    'flights': 'Flights',
    'car_rentals': 'Car rentals',
    'attractions': 'Attractions',
    'tour_packages': 'Tour Packages',
    
    // Hero/Search Section
    'find_next_stay': 'Find your next stay',
    'search_placeholder': 'Where are you going?',
    'check_in': 'Check-in',
    'check_out': 'Check-out',
    'guests': 'Guests',
    'adults': 'Adults',
    'children': 'Children',
    'rooms': 'Rooms',
    'search': 'Search',
    
    // Offers Section
    'offers': 'Offers',
    'offers_subtitle': 'Promotions, deals, and special offers for you',
    'black_friday': 'Black Friday Deals',
    'car_rental_deal': 'Get up to 25% off car rental',
    'car_rental_desc': 'Shift into saving with Black Friday Deals on rental cars',
    'attractions_deal': 'Up to 20% off attractions',
    'attractions_desc': 'Make exploring easy with savings on select experiences',
    'find_deals': 'Find deals',
    
    // Trending Destinations
    'trending_destinations': 'Trending destinations',
    'trending_subtitle': 'Most popular choices for travelers',
    
    // Properties Section
    'unique_properties': 'Stay updated on unique choices',
    'unique_subtitle': 'From all over the global',
    'nature': 'Nature',
    'meditation': 'Get a quiet moment of Meditation',
    'hotel': 'Hotel',
    'safaris': 'Safaris',
    'safari_desc': 'Get life memory of the safaris in East Africa',
    'hiking': 'Hiking',
    'hiking_desc': 'Get Amazing Hiking Experiences',
    'wonderful': 'Wonderful',
    'very_good': 'Very Good',
    'excellent': 'Excellent',
    'reviews': 'reviews',
    
    // Trip Planner
    'trip_planner': 'Quick and easy trip planner',
    'trip_subtitle': 'Pick a vibe and explore the top destinations in Ghana',
    
    // Team Section
    'team_title': 'Meet Our Expert Travel Team',
    'chief_travel_officer': 'Chief Travel Officer',
    'safari_specialist': 'Safari & Wildlife Specialist',
    'cultural_director': 'Cultural Tours Director',
    'adventure_specialist': 'Adventure Travel Specialist',
    'years_experience': '15+ years crafting unforgettable travel experiences across 80+ countries.',
    'safari_bio': 'Expert guide with deep knowledge of African wildlife and conservation.',
    'cultural_bio': 'Passionate about connecting travelers with authentic local experiences.',
    'adventure_bio': 'Adrenaline junkie specializing in extreme sports and adventure tours.',
    
    // Footer
    'support': 'Support',
    'manage_trips': 'Manage your trips',
    'customer_service': 'Contact Customer Service',
    'safety_center': 'Safety resource center',
    'discover': 'Discover',
    'genius_program': 'Genius loyalty program',
    'seasonal_deals': 'Seasonal and holiday deals',
    'travel_articles': 'Travel articles',
    'review_awards': 'Traveller Review Awards',
    'terms_settings': 'Terms and settings',
    'privacy_cookies': 'Privacy & cookies',
    'terms_conditions': 'Terms and conditions',
    'partner_dispute': 'Partner dispute',
    'how_we_work': 'How we work',
    'partners': 'Partners',
    'extranet_login': 'Extranet login',
    'partner_help': 'Partner help',
    'list_property': 'List your property',
    'become_affiliate': 'Become an affiliate',
    'rights_reserved': '© 2025 Adventurous Travel Express. All rights reserved.',
    
    // Booking/Dashboard
    'total_bookings': 'Total Bookings',
    'upcoming_trips': 'Upcoming Trips',
    'total_spent': 'Total Spent',
    'quick_actions': 'Quick Actions',
    'book_flight': 'Book Flight',
    'find_hotels': 'Find Hotels',
    'rent_car': 'Rent a Car',
    'browse_tours': 'Browse Tours',
    'my_bookings': 'My Bookings',
    'all': 'All',
    'confirmed': 'Confirmed',
    'upcoming': 'Upcoming',
    'logout': 'Logout',
    
    // Additional Common Elements
    'welcome': 'Welcome',
    'back_to_home': 'Back to Home',
    'view_all': 'View All',
    'load_more': 'Load More',
    'showing': 'Showing',
    'results': 'results',
    'filter': 'Filter',
    'sort_by': 'Sort By',
    'price': 'Price',
    'rating': 'Rating',
    'popular': 'Popular',
    'recommended': 'Recommended',
    'price_low_high': 'Price: Low to High',
    'price_high_low': 'Price: High to Low',
    'per_night': 'per night',
    'per_person': 'per person',
    'per_day': 'per day',
    'book_now': 'Book Now',
    'view_details': 'View Details',
    'show_more': 'Show More',
    'show_less': 'Show Less',
    'from': 'From',
    'to': 'To',
    'departure': 'Departure',
    'return': 'Return',
    'one_way': 'One Way',
    'round_trip': 'Round Trip',
    'passengers': 'Passengers',
    'class': 'Class',
    'economy': 'Economy',
    'business': 'Business',
    'first_class': 'First Class',
    'select': 'Select',
    'selected': 'Selected',
    'available': 'Available',
    'unavailable': 'Unavailable',
    'full': 'Full',
    'details': 'Details',
    'location': 'Location',
    'duration': 'Duration',
    'destination': 'Destination',
    'check_in': 'Check-in',
    'check_out': 'Check-out',
    'guests': 'Guests',
    'includes': 'Includes',
    'excludes': 'Excludes',
    'description': 'Description',
    'amenities': 'Amenities',
    'features': 'Features',
    'policies': 'Policies',
    'cancellation': 'Cancellation',
    'free_cancellation': 'Free Cancellation',
    'contact': 'Contact',
    'phone': 'Phone',
    'email': 'Email',
    'address': 'Address',
    'reviews_count': 'reviews',
    'write_review': 'Write a Review',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'save': 'Save',
    'edit': 'Edit',
    'delete': 'Delete',
    'success': 'Success',
    'error': 'Error',
    'loading': 'Loading...',
    'no_results': 'No results found',
    'try_again': 'Try Again',
    'total': 'Total',
    'no_bookings': 'No bookings yet'
  },
  
  fr: {
    // Top Header
    'currency': 'Devise',
    'dashboard': 'Tableau de bord',
    'help': 'Aide',
    'register': "S'inscrire",
    'signin': 'Se connecter',
    
    // Navigation
    'home': 'Accueil',
    'stays': 'Séjours',
    'flights': 'Vols',
    'car_rentals': 'Location de voiture',
    'attractions': 'Attractions',
    'tour_packages': 'Forfaits touristiques',
    
    // Hero/Search Section
    'find_next_stay': 'Trouvez votre prochain séjour',
    'search_placeholder': 'Où allez-vous?',
    'check_in': 'Arrivée',
    'check_out': 'Départ',
    'guests': 'Invités',
    'adults': 'Adultes',
    'children': 'Enfants',
    'rooms': 'Chambres',
    'search': 'Rechercher',
    
    // Offers Section
    'offers': 'Offres',
    'offers_subtitle': 'Promotions, offres et offres spéciales pour vous',
    'black_friday': 'Offres du Black Friday',
    'car_rental_deal': "Jusqu'à 25% de réduction sur la location de voiture",
    'car_rental_desc': 'Économisez avec les offres du Black Friday sur les locations de voitures',
    'attractions_deal': "Jusqu'à 20% de réduction sur les attractions",
    'attractions_desc': 'Facilitez votre exploration avec des économies sur certaines expériences',
    'find_deals': 'Trouver des offres',
    
    // Trending Destinations
    'trending_destinations': 'Destinations tendance',
    'trending_subtitle': 'Les choix les plus populaires pour les voyageurs',
    
    // Properties Section
    'unique_properties': 'Restez informé des choix uniques',
    'unique_subtitle': 'Du monde entier',
    'nature': 'Nature',
    'meditation': 'Profitez d\'un moment de méditation tranquille',
    'hotel': 'Hôtel',
    'safaris': 'Safaris',
    'safari_desc': 'Créez des souvenirs inoubliables lors de safaris en Afrique de l\'Est',
    'hiking': 'Randonnée',
    'hiking_desc': 'Vivez des expériences de randonnée incroyables',
    'wonderful': 'Merveilleux',
    'very_good': 'Très bien',
    'excellent': 'Excellent',
    'reviews': 'avis',
    
    // Trip Planner
    'trip_planner': 'Planificateur de voyage rapide et facile',
    'trip_subtitle': 'Choisissez une ambiance et explorez les meilleures destinations au Ghana',
    
    // Team Section
    'team_title': 'Rencontrez notre équipe d\'experts en voyage',
    'chief_travel_officer': 'Directeur des voyages',
    'safari_specialist': 'Spécialiste Safari et Faune',
    'cultural_director': 'Directeur des circuits culturels',
    'adventure_specialist': 'Spécialiste des voyages d\'aventure',
    'years_experience': 'Plus de 15 ans à créer des expériences de voyage inoubliables dans plus de 80 pays.',
    'safari_bio': 'Guide expert avec une connaissance approfondie de la faune africaine et de la conservation.',
    'cultural_bio': 'Passionné par la connexion des voyageurs avec des expériences locales authentiques.',
    'adventure_bio': 'Accro à l\'adrénaline spécialisé dans les sports extrêmes et les circuits d\'aventure.',
    
    // Footer
    'support': 'Assistance',
    'manage_trips': 'Gérer vos voyages',
    'customer_service': 'Contacter le service client',
    'safety_center': 'Centre de ressources de sécurité',
    'discover': 'Découvrir',
    'genius_program': 'Programme de fidélité Genius',
    'seasonal_deals': 'Offres saisonnières et de vacances',
    'travel_articles': 'Articles de voyage',
    'review_awards': 'Prix des avis de voyageurs',
    'terms_settings': 'Conditions et paramètres',
    'privacy_cookies': 'Confidentialité et cookies',
    'terms_conditions': 'Termes et conditions',
    'partner_dispute': 'Litige avec un partenaire',
    'how_we_work': 'Comment nous travaillons',
    'partners': 'Partenaires',
    'extranet_login': 'Connexion extranet',
    'partner_help': 'Aide aux partenaires',
    'list_property': 'Inscrivez votre propriété',
    'become_affiliate': 'Devenez affilié',
    'rights_reserved': '© 2025 Adventurous Travel Express. Tous droits réservés.',
    
    // Booking/Dashboard
    'total_bookings': 'Réservations totales',
    'upcoming_trips': 'Voyages à venir',
    'total_spent': 'Total dépensé',
    'quick_actions': 'Actions rapides',
    'book_flight': 'Réserver un vol',
    'find_hotels': 'Trouver des hôtels',
    'rent_car': 'Louer une voiture',
    'browse_tours': 'Parcourir les circuits',
    'my_bookings': 'Mes réservations',
    'all': 'Tous',
    'confirmed': 'Confirmé',
    'upcoming': 'À venir',
    'logout': 'Déconnexion',
    
    // Additional Common Elements
    'welcome': 'Bienvenue',
    'back_to_home': 'Retour à l\'accueil',
    'view_all': 'Voir tout',
    'load_more': 'Charger plus',
    'showing': 'Affichage',
    'results': 'résultats',
    'filter': 'Filtrer',
    'sort_by': 'Trier par',
    'price': 'Prix',
    'rating': 'Note',
    'popular': 'Populaire',
    'recommended': 'Recommandé',
    'price_low_high': 'Prix: Bas à Élevé',
    'price_high_low': 'Prix: Élevé à Bas',
    'per_night': 'par nuit',
    'per_person': 'par personne',
    'per_day': 'par jour',
    'book_now': 'Réserver maintenant',
    'view_details': 'Voir les détails',
    'show_more': 'Afficher plus',
    'show_less': 'Afficher moins',
    'from': 'De',
    'to': 'À',
    'departure': 'Départ',
    'return': 'Retour',
    'one_way': 'Aller simple',
    'round_trip': 'Aller-retour',
    'passengers': 'Passagers',
    'class': 'Classe',
    'economy': 'Économique',
    'business': 'Affaires',
    'first_class': 'Première classe',
    'select': 'Sélectionner',
    'selected': 'Sélectionné',
    'available': 'Disponible',
    'unavailable': 'Indisponible',
    'full': 'Complet',
    'details': 'Détails',
    'location': 'Emplacement',
    'duration': 'Durée',
    'includes': 'Inclus',
    'excludes': 'Exclus',
    'description': 'Description',
    'amenities': 'Équipements',
    'features': 'Caractéristiques',
    'policies': 'Politiques',
    'cancellation': 'Annulation',
    'free_cancellation': 'Annulation gratuite',
    'contact': 'Contact',
    'phone': 'Téléphone',
    'email': 'E-mail',
    'address': 'Adresse',
    'reviews_count': 'avis',
    'write_review': 'Écrire un avis',
    'submit': 'Soumettre',
    'cancel': 'Annuler',
    'save': 'Enregistrer',
    'edit': 'Modifier',
    'delete': 'Supprimer',
    'success': 'Succès',
    'error': 'Erreur',
    'loading': 'Chargement...',
    'no_results': 'Aucun résultat trouvé',
    'try_again': 'Réessayer',
    'total': 'Total',
    'no_bookings': 'Aucune réservation pour le moment'
  },
  
  es: {
    // Top Header
    'currency': 'Moneda',
    'dashboard': 'Panel de control',
    'help': 'Ayuda',
    'register': 'Registrarse',
    'signin': 'Iniciar sesión',
    
    // Navigation
    'home': 'Inicio',
    'stays': 'Estancias',
    'flights': 'Vuelos',
    'car_rentals': 'Alquiler de coches',
    'attractions': 'Atracciones',
    'tour_packages': 'Paquetes turísticos',
    
    // Hero/Search Section
    'find_next_stay': 'Encuentra tu próxima estancia',
    'search_placeholder': '¿A dónde vas?',
    'check_in': 'Entrada',
    'check_out': 'Salida',
    'guests': 'Huéspedes',
    'adults': 'Adultos',
    'children': 'Niños',
    'rooms': 'Habitaciones',
    'search': 'Buscar',
    
    // Offers Section
    'offers': 'Ofertas',
    'offers_subtitle': 'Promociones, ofertas y ofertas especiales para ti',
    'black_friday': 'Ofertas de Black Friday',
    'car_rental_deal': 'Hasta 25% de descuento en alquiler de coches',
    'car_rental_desc': 'Ahorra con las ofertas del Black Friday en alquiler de coches',
    'attractions_deal': 'Hasta 20% de descuento en atracciones',
    'attractions_desc': 'Facilita la exploración con ahorros en experiencias seleccionadas',
    'find_deals': 'Encontrar ofertas',
    
    // Trending Destinations
    'trending_destinations': 'Destinos de moda',
    'trending_subtitle': 'Las opciones más populares para los viajeros',
    
    // Properties Section
    'unique_properties': 'Mantente actualizado sobre opciones únicas',
    'unique_subtitle': 'De todo el mundo',
    'nature': 'Naturaleza',
    'meditation': 'Disfruta de un momento tranquilo de meditación',
    'hotel': 'Hotel',
    'safaris': 'Safaris',
    'safari_desc': 'Crea recuerdos inolvidables de safaris en África Oriental',
    'hiking': 'Senderismo',
    'hiking_desc': 'Vive experiencias increíbles de senderismo',
    'wonderful': 'Maravilloso',
    'very_good': 'Muy bueno',
    'excellent': 'Excelente',
    'reviews': 'reseñas',
    
    // Trip Planner
    'trip_planner': 'Planificador de viajes rápido y fácil',
    'trip_subtitle': 'Elige un ambiente y explora los mejores destinos de Ghana',
    
    // Team Section
    'team_title': 'Conoce a nuestro equipo experto en viajes',
    'chief_travel_officer': 'Director de Viajes',
    'safari_specialist': 'Especialista en Safari y Vida Silvestre',
    'cultural_director': 'Director de Tours Culturales',
    'adventure_specialist': 'Especialista en Viajes de Aventura',
    'years_experience': 'Más de 15 años creando experiencias de viaje inolvidables en más de 80 países.',
    'safari_bio': 'Guía experto con profundo conocimiento de la vida silvestre africana y la conservación.',
    'cultural_bio': 'Apasionado por conectar a los viajeros con experiencias locales auténticas.',
    'adventure_bio': 'Amante de la adrenalina especializado en deportes extremos y tours de aventura.',
    
    // Footer
    'support': 'Soporte',
    'manage_trips': 'Gestiona tus viajes',
    'customer_service': 'Contactar servicio al cliente',
    'safety_center': 'Centro de recursos de seguridad',
    'discover': 'Descubrir',
    'genius_program': 'Programa de fidelidad Genius',
    'seasonal_deals': 'Ofertas estacionales y de vacaciones',
    'travel_articles': 'Artículos de viaje',
    'review_awards': 'Premios de reseñas de viajeros',
    'terms_settings': 'Términos y configuración',
    'privacy_cookies': 'Privacidad y cookies',
    'terms_conditions': 'Términos y condiciones',
    'partner_dispute': 'Disputa con socios',
    'how_we_work': 'Cómo trabajamos',
    'partners': 'Socios',
    'extranet_login': 'Inicio de sesión extranet',
    'partner_help': 'Ayuda para socios',
    'list_property': 'Lista tu propiedad',
    'become_affiliate': 'Conviértete en afiliado',
    'rights_reserved': '© 2025 Adventurous Travel Express. Todos los derechos reservados.',
    
    // Booking/Dashboard
    'total_bookings': 'Reservas totales',
    'upcoming_trips': 'Viajes próximos',
    'total_spent': 'Total gastado',
    'quick_actions': 'Acciones rápidas',
    'book_flight': 'Reservar vuelo',
    'find_hotels': 'Encontrar hoteles',
    'rent_car': 'Alquilar un coche',
    'browse_tours': 'Explorar tours',
    'my_bookings': 'Mis reservas',
    'all': 'Todos',
    'confirmed': 'Confirmado',
    'upcoming': 'Próximos',
    'logout': 'Cerrar sesión',
    
    // Additional Common Elements
    'welcome': 'Bienvenido',
    'back_to_home': 'Volver al inicio',
    'view_all': 'Ver todo',
    'load_more': 'Cargar más',
    'showing': 'Mostrando',
    'results': 'resultados',
    'filter': 'Filtrar',
    'sort_by': 'Ordenar por',
    'price': 'Precio',
    'rating': 'Calificación',
    'popular': 'Popular',
    'recommended': 'Recomendado',
    'price_low_high': 'Precio: Bajo a Alto',
    'price_high_low': 'Precio: Alto a Bajo',
    'per_night': 'por noche',
    'per_person': 'por persona',
    'per_day': 'por día',
    'book_now': 'Reservar ahora',
    'view_details': 'Ver detalles',
    'show_more': 'Mostrar más',
    'show_less': 'Mostrar menos',
    'from': 'Desde',
    'to': 'Hasta',
    'departure': 'Salida',
    'return': 'Regreso',
    'one_way': 'Solo ida',
    'round_trip': 'Ida y vuelta',
    'passengers': 'Pasajeros',
    'class': 'Clase',
    'economy': 'Económica',
    'business': 'Negocios',
    'first_class': 'Primera clase',
    'select': 'Seleccionar',
    'selected': 'Seleccionado',
    'available': 'Disponible',
    'unavailable': 'No disponible',
    'full': 'Completo',
    'details': 'Detalles',
    'location': 'Ubicación',
    'duration': 'Duración',
    'destination': 'Destino',
    'check_in': 'Entrada',
    'check_out': 'Salida',
    'guests': 'Huéspedes',
    'includes': 'Incluye',
    'excludes': 'Excluye',
    'description': 'Descripción',
    'amenities': 'Servicios',
    'features': 'Características',
    'policies': 'Políticas',
    'cancellation': 'Cancelación',
    'free_cancellation': 'Cancelación gratuita',
    'contact': 'Contacto',
    'phone': 'Teléfono',
    'email': 'Correo electrónico',
    'address': 'Dirección',
    'reviews_count': 'reseñas',
    'write_review': 'Escribir una reseña',
    'submit': 'Enviar',
    'cancel': 'Cancelar',
    'save': 'Guardar',
    'edit': 'Editar',
    'delete': 'Eliminar',
    'success': 'Éxito',
    'error': 'Error',
    'loading': 'Cargando...',
    'no_results': 'No se encontraron resultados',
    'try_again': 'Intentar de nuevo',
    'total': 'Total',
    'no_bookings': 'Aún no hay reservas'
  },
  
  sw: {
    // Top Header
    'currency': 'Sarafu',
    'dashboard': 'Dashibodi',
    'help': 'Msaada',
    'register': 'Jiandikishe',
    'signin': 'Ingia',
    
    // Navigation
    'home': 'Nyumbani',
    'stays': 'Makazi',
    'flights': 'Ndege',
    'car_rentals': 'Kukodisha Gari',
    'attractions': 'Vivutio',
    'tour_packages': 'Vifurushi vya Ziara',
    
    // Hero/Search Section
    'find_next_stay': 'Pata makazi yako yajayo',
    'search_placeholder': 'Unaenda wapi?',
    'check_in': 'Kuingia',
    'check_out': 'Kutoka',
    'guests': 'Wageni',
    'adults': 'Watu Wazima',
    'children': 'Watoto',
    'rooms': 'Vyumba',
    'search': 'Tafuta',
    
    // Offers Section
    'offers': 'Ofa',
    'offers_subtitle': 'Matangazo, ofa na ofa maalum kwako',
    'black_friday': 'Ofa za Ijumaa Nyeusi',
    'car_rental_deal': 'Pata punguzo la hadi 25% kwa kukodisha gari',
    'car_rental_desc': 'Okoa kwa ofa za Ijumaa Nyeusi kwa kukodisha magari',
    'attractions_deal': 'Hadi 20% punguzo kwa vivutio',
    'attractions_desc': 'Fanya ugunduzi kuwa rahisi kwa akiba kwa uzoefu uliochaguliwa',
    'find_deals': 'Pata ofa',
    
    // Trending Destinations
    'trending_destinations': 'Maeneo yanayovutia',
    'trending_subtitle': 'Chaguo maarufu zaidi kwa wasafiri',
    
    // Properties Section
    'unique_properties': 'Baki ukijua chaguo za kipekee',
    'unique_subtitle': 'Kutoka ulimwenguni kote',
    'nature': 'Asili',
    'meditation': 'Pata wakati wa utulivu wa kutafakari',
    'hotel': 'Hoteli',
    'safaris': 'Safari',
    'safari_desc': 'Unda kumbukumbu za maisha ya safari katika Afrika Mashariki',
    'hiking': 'Kutembea Mlimani',
    'hiking_desc': 'Pata uzoefu wa ajabu wa kutembea mlimani',
    'wonderful': 'Ajabu',
    'very_good': 'Nzuri sana',
    'excellent': 'Bora kabisa',
    'reviews': 'mapitio',
    
    // Trip Planner
    'trip_planner': 'Mpangaji wa safari wa haraka na rahisi',
    'trip_subtitle': 'Chagua hali na gundua maeneo bora ya Ghana',
    
    // Team Section
    'team_title': 'Kutana na Timu Yetu ya Wataalam wa Kusafiri',
    'chief_travel_officer': 'Mkuu wa Kusafiri',
    'safari_specialist': 'Mtaalamu wa Safari na Wanyamapori',
    'cultural_director': 'Mkurugenzi wa Ziara za Kitamaduni',
    'adventure_specialist': 'Mtaalamu wa Safari za Kujikuta',
    'years_experience': 'Zaidi ya miaka 15 kuunda uzoefu wa safari usiosahaulika katika nchi zaidi ya 80.',
    'safari_bio': 'Kiongozi mtaalamu mwenye maarifa ya kina kuhusu wanyamapori wa Afrika na uhifadhi.',
    'cultural_bio': 'Mwenye shauku ya kuunganisha wasafiri na uzoefu wa asili wa kienyeji.',
    'adventure_bio': 'Mwenye kupenda adrenaline aliyefanyakazi katika michezo ya hatari na safari za kujikuta.',
    
    // Footer
    'support': 'Usaidizi',
    'manage_trips': 'Dhibiti safari zako',
    'customer_service': 'Wasiliana na Huduma kwa Wateja',
    'safety_center': 'Kituo cha rasilimali za usalama',
    'discover': 'Gundua',
    'genius_program': 'Programu ya uaminifu wa Genius',
    'seasonal_deals': 'Ofa za msimu na likizo',
    'travel_articles': 'Makala za kusafiri',
    'review_awards': 'Tuzo za Mapitio ya Wasafiri',
    'terms_settings': 'Masharti na mipangilio',
    'privacy_cookies': 'Faragha na vidakuzi',
    'terms_conditions': 'Masharti na hali',
    'partner_dispute': 'Mgogoro wa mshirika',
    'how_we_work': 'Jinsi tunavyofanya kazi',
    'partners': 'Washirika',
    'extranet_login': 'Kuingia kwenye extranet',
    'partner_help': 'Msaada kwa washirika',
    'list_property': 'Orodhesha mali yako',
    'become_affiliate': 'Kuwa mshirika',
    'rights_reserved': '© 2025 Adventurous Travel Express. Haki zote zimehifadhiwa.',
    
    // Booking/Dashboard
    'total_bookings': 'Urefu wa Jumla',
    'upcoming_trips': 'Safari Zinazokuja',
    'total_spent': 'Jumla Iliyotumika',
    'quick_actions': 'Vitendo vya Haraka',
    'book_flight': 'Kuhifadhi Ndege',
    'find_hotels': 'Pata Hoteli',
    'rent_car': 'Kukodisha Gari',
    'browse_tours': 'Vinjari Ziara',
    'my_bookings': 'Uhifadhi Wangu',
    'all': 'Zote',
    'confirmed': 'Imethibitishwa',
    'upcoming': 'Zinazokuja',
    'logout': 'Toka',
    
    // Additional Common Elements
    'welcome': 'Karibu',
    'back_to_home': 'Rudi Nyumbani',
    'view_all': 'Tazama Zote',
    'load_more': 'Pakia Zaidi',
    'showing': 'Inaonyesha',
    'results': 'matokeo',
    'filter': 'Chuja',
    'sort_by': 'Panga kwa',
    'price': 'Bei',
    'rating': 'Ukadiriaji',
    'popular': 'Maarufu',
    'recommended': 'Inashauriwa',
    'price_low_high': 'Bei: Chini hadi Juu',
    'price_high_low': 'Bei: Juu hadi Chini',
    'per_night': 'kwa usiku',
    'per_person': 'kwa mtu',
    'per_day': 'kwa siku',
    'book_now': 'Hifadhi Sasa',
    'view_details': 'Tazama Maelezo',
    'show_more': 'Onyesha Zaidi',
    'show_less': 'Onyesha Kidogo',
    'from': 'Kutoka',
    'to': 'Hadi',
    'departure': 'Kuondoka',
    'return': 'Kurudi',
    'one_way': 'Njia Moja',
    'round_trip': 'Safari ya Kurudi',
    'passengers': 'Abiria',
    'class': 'Daraja',
    'economy': 'Kiuchumi',
    'business': 'Biashara',
    'first_class': 'Daraja la Kwanza',
    'select': 'Chagua',
    'selected': 'Imechaguliwa',
    'available': 'Inapatikana',
    'unavailable': 'Haipatikani',
    'full': 'Imejaa',
    'details': 'Maelezo',
    'location': 'Mahali',
    'duration': 'Muda',
    'destination': 'Marudio',
    'check_in': 'Kuingia',
    'check_out': 'Kutoka',
    'guests': 'Wageni',
    'includes': 'Inajumuisha',
    'excludes': 'Haijumuishi',
    'description': 'Maelezo',
    'amenities': 'Vifaa',
    'features': 'Vipengele',
    'policies': 'Sera',
    'cancellation': 'Kughairi',
    'free_cancellation': 'Kughairi bila Malipo',
    'contact': 'Wasiliana',
    'phone': 'Simu',
    'email': 'Barua pepe',
    'address': 'Anwani',
    'reviews_count': 'mapitio',
    'write_review': 'Andika Upitaji',
    'submit': 'Wasilisha',
    'cancel': 'Ghairi',
    'save': 'Hifadhi',
    'edit': 'Hariri',
    'delete': 'Futa',
    'success': 'Mafanikio',
    'error': 'Kosa',
    'loading': 'Inapakia...',
    'no_results': 'Hakuna matokeo',
    'try_again': 'Jaribu Tena',
    'total': 'Jumla',
    'no_bookings': 'Hakuna uhifadhi bado'
  }
};

// Language manager
class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.init();
  }

  init() {
    // Set initial language
    this.setLanguage(this.currentLanguage);
    
    // Update language selector if it exists
    const selector = document.getElementById('languageSelector');
    if (selector) {
      selector.value = this.currentLanguage;
    }
  }

  setLanguage(lang) {
    if (!translations[lang]) {
      console.error(`Language ${lang} not found`);
      return;
    }

    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Translate all elements with data-translate attribute
    this.translatePage();
  }

  translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = translations[this.currentLanguage][key];
      
      if (translation) {
        // Check if element has a placeholder
        if (element.hasAttribute('placeholder')) {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
  }

  translate(key) {
    return translations[this.currentLanguage][key] || key;
  }
}

// Initialize language manager
let languageManager;
document.addEventListener('DOMContentLoaded', () => {
  languageManager = new LanguageManager();
});

// Function to change language
function changeLanguage(lang) {
  if (languageManager) {
    languageManager.setLanguage(lang);
  }
}
