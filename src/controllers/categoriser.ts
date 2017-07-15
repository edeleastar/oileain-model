interface CategoryRange {
  start: number;
  end: number;
  category: string;
}

export class Categories {

  title: string;
  categories: Array<CategoryRange> = [];
  categoryNames: string[];

  constructor(title: string, categoryNames: string[]) {
    this.title = title;
    this.categoryNames = categoryNames;
  }

  addCategory(start: number, categoryName: string) {
    this.categories.push({ start: start, end: 0, category: categoryName });
  }

  setRanges(limit: number) {
    for (let j = 0; j < this.categories.length - 1; j++) {
      this.categories[j].end = this.categories[j + 1].start - 1;
    }
    this.categories[this.categories.length - 1].end = limit;
  }

  getCategory(pos: number): string {
    let category = '';
    let s = this.categories.filter(cat => {
      if (pos > cat.start && pos < cat.end) return cat;
    });
    if (s.length > 0) {
      category = s[0].category;
    }
    return category;
  }

  harvestCategories(words: string[]) {
    for (let i = 0; i < words.length; i++) {
      let category = '';
      if (words[i].startsWith('**')) {
        if (!words[i].endsWith('**')) {
          do {
            category += words[i];
            category += ' ';
            i++;
          } while (!words[i].endsWith('**'));
        }
        category += words[i];
      }
      if (this.categoryNames.indexOf(category) >= 0) {
        this.addCategory(i, category);
      }
    }
    this.setRanges(words.length);
  }

}
