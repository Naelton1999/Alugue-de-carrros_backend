import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Icategoriesrepository, IcreateCategoriesDTO } from '../Icategoriesrepositore';

class Categoriesrepositoryinmemory implements Icategoriesrepository{
    categories: Category[]=[];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category)=> category.name===name);
        return category
    }
    async list(): Promise<Category[]> {
        const all= this.categories
        return all 
    }
    async create({ name, description }: IcreateCategoriesDTO): Promise<void> {
    const category = new Category()
    Object.assign(category,{
        name,
        description
    });
    this.categories.push(category);
    }

}
export {Categoriesrepositoryinmemory}