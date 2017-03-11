import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let mediatypes = [
        {"id": 1, "name": "Television"},
        {"id": 2, "name": "Radio"},
        {"id": 3, "name": "News print"},
        {"id": 4, "name": "Magazine print"},
        {"id": 5, "name": "Internet News"},
        {"id": 6, "name": "Internet Magazine"},
        {"id": 7, "name": "Other"}
        ];
    
    let mediasources = [
        {"id": 1, "name": "ABC News with David Muir","mediaTypeId": 1 },
        {"id": 2, "name": "NBC Nightly News", "mediaTypeId": 1},
        {"id": 3, "name": "CBS Nightly News", "mediaTypeId": 1},
        {"id": 4, "name": "New York Times", "mediaTypeId": 3},
        {"id": 5, "name": "US Today", "mediaTypeId": 3},
        {"id": 6, "name": "Wall Street Journal", "mediaTypeId": 3},
        {"id": 7, "name": "Time", "mediaTypeId": 4},
        {"id": 8, "name": "Newsweek", "mediaTypeId": 4}
        ];

    let categories = [
        {"id": 1, "name": "Politics"},
        {"id": 2, "name": "Science"},
        {"id": 3, "name": "Technology"},
        {"id": 4, "name": "World"},
        {"id": 5, "name": "Business"},
        {"id": 6, "name": "Entertainment"},
        {"id": 7, "name": "Sports"}
        ];
    
    return {mediatypes, mediasources, categories};
  }
}