export type Odds = {
	favorite: number; // Negative number for favorites
	underdog: number; // Positive number for underdogs
};

export const calculateWinnings = (odds: number, betAmount: number): number => {
	if (odds > 0) {
		// Positive odds (underdog)
		return betAmount * (odds / 100);
	} else {
		// Negative odds (favorite)
		return betAmount * (100 / Math.abs(odds));
	}
};
