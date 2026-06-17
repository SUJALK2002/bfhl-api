const processInput = (data, requestId) => {
    let numbers = [];
    let alphabets = [];
    let specialCharacters = [];
    let sum = 0;
    let duplicateFound = false;

    let totalElementsReceived = data.length;
    let invalidElementsIgnored = 0;

    const seen = new Set();
    const alphabetFrequency = {};

    data.forEach(item => {

        // Ignore null / empty / spaces
        if (item == null || item.toString().trim() === "") {
            invalidElementsIgnored++;
            return;
        }

        item = item.toString().trim();

        // Duplicate check
        if (seen.has(item)) {
            duplicateFound = true;
            return;
        }

        seen.add(item);

        // Pure number (supports negative + decimal)
        if (/^-?\d+(\.\d+)?$/.test(item)) {
            numbers.push(Number(item));
            sum += Number(item);
        }

        // Pure alphabet
        else if (/^[a-zA-Z]+$/.test(item)) {
            let upper = item.toUpperCase();
            alphabets.push(upper);

            for (let ch of upper) {
                alphabetFrequency[ch] =
                    (alphabetFrequency[ch] || 0) + 1;
            }
        }

        // Pure special characters
        else if (/^[^a-zA-Z0-9]+$/.test(item)) {
            specialCharacters.push(item);
        }

        // Alphanumeric
        else {
            let chars = item.match(/[a-zA-Z]/g) || [];
            let nums = item.match(/-?\d+(\.\d+)?/g) || [];

            chars.forEach(ch => {
                let upper = ch.toUpperCase();
                alphabets.push(upper);

                alphabetFrequency[upper] =
                    (alphabetFrequency[upper] || 0) + 1;
            });

            nums.forEach(num => {
                numbers.push(Number(num));
                sum += Number(num);
            });

            // Extract special chars if any
            let specials = item.match(/[^a-zA-Z0-9.-]/g) || [];
            specialCharacters.push(...specials);
        }
    });

    // Count vowels
    let vowelCount = alphabets.filter(ch =>
        ["A", "E", "I", "O", "U"].includes(ch)
    ).length;

    // Longest alphabetic value
    let pureAlphaValues = [...seen]
        .filter(item => /^[a-zA-Z]+$/.test(item))
        .map(item => item.toUpperCase());

    let longestAlphabeticValue = pureAlphaValues.length
        ? pureAlphaValues.reduce((a, b) =>
            a.length >= b.length ? a : b)
        : null;

    let shortestAlphabeticValue = pureAlphaValues.length
        ? pureAlphaValues.reduce((a, b) =>
            a.length <= b.length ? a : b)
        : null;

    return {
        is_success: true,
        request_id: requestId,

        odd_numbers: numbers.filter(n => Math.abs(n % 2) === 1),
        even_numbers: numbers.filter(n => n % 2 === 0),

        alphabets,
        special_characters: specialCharacters,

        sum: sum.toString(),

        largest_number: numbers.length
            ? Math.max(...numbers).toString()
            : null,

        smallest_number: numbers.length
            ? Math.min(...numbers).toString()
            : null,

        alphabet_count: alphabets.length,
        number_count: numbers.length,
        special_character_count: specialCharacters.length,

        contains_duplicates: duplicateFound,

        unique_element_count: seen.size,

        sorted_numbers: [...numbers].sort((a, b) => a - b),

        vowel_count: vowelCount,

        alphabet_frequency: alphabetFrequency,

        longest_alphabetic_value: longestAlphabeticValue,
        shortest_alphabetic_value: shortestAlphabeticValue,

        summary: {
            total_elements_received: totalElementsReceived,
            valid_elements_processed: seen.size,
            invalid_elements_ignored: invalidElementsIgnored
        }
    };
};

module.exports = { processInput };