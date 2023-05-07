export interface Order {
    drink: string;
    isStudent: boolean;
    amount: number | string;
}

export enum Drink {
    BEER_ONE = "heineken",
    BEER_TWO = "corona",
    COCKTAIL_ONE = "mojito",
    COCKTAIL_TWO = "margarita",
    SPECIAL_COCKTAIL = "special_bacardi"
}

type Ingrediens = "rum" | "mint" | "limeJuice" | "sugar" | "tonicWater" | "gin";

const ingrediens: Record<Ingrediens, number> = {
    rum: 65,
    mint: 10,
    limeJuice: 10,
    sugar: 10,
    tonicWater: 20,
    gin: 85
  };

const prices: Record<string, number> = {
    [Drink.BEER_ONE]: 74,
    [Drink.BEER_TWO]: 110,
    [Drink.COCKTAIL_ONE]: 103,
    [Drink.COCKTAIL_TWO]: ingrediens.sugar + ingrediens.tonicWater + ingrediens.gin,
    [Drink.SPECIAL_COCKTAIL]: ingrediens.rum + ingrediens.mint + ingrediens.limeJuice + ingrediens.gin / 2
  };

export const calculateCost = ({drink, isStudent, amount}: Order): number => {
    const MAX_COCKTAILS = 2;
    const parsedAmount = Number(amount);

    if (Object.values(Drink).includes(drink as Drink) === false) {
        throw new Error("Drink does not exist.");
    }

    if ((parsedAmount > MAX_COCKTAILS) && (drink === Drink.COCKTAIL_ONE || drink === Drink.COCKTAIL_TWO)) {
        throw new Error("Not allowed to order more than 2 cocktails.");
    }

    let finalPrice: number;

    if (drink in prices) {
        finalPrice = prices[drink];
    } else {
        throw new Error("Drink does not exist.");
    }

    if (isStudent && (drink === Drink.BEER_ONE || drink === Drink.BEER_TWO)) {
        finalPrice -= finalPrice / 10;
    }
    
    if (!finalPrice) return 0;

    return Math.ceil(finalPrice * parsedAmount);
};