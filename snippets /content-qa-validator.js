/**
 * Automated Content QA & Guardrails
 * Logic: Validates AI-generated copy against business constraints.
 * 1. Checks minimum length (SEO standard).
 * 2. Filters for forbidden/brand-unsafe terminology.
 */

const forbiddenWords = ["irreverente", "explora"]; // Example list of restricted terms
const minLength = 120;

const finalResults = [];

for (const item of $input.all()) {
    const desc = item.json.descripcion_fever || "";
    let status = "Approved";
    let observation = "";

    // Length Validation
    if (desc.length < minLength) {
        status = "Rejected";
        observation = "Copy too short for SEO standards.";
    }

    // Prohibited Content Check
    const containsForbidden = forbiddenWords.some(word => 
        desc.toLowerCase().includes(word.toLowerCase())
    );

    if (containsForbidden) {
        status = "Rejected";
        observation = "Contains forbidden brand language.";
    }

    finalResults.push({
        json: {
            title: item.json.titulo,
            content: desc,
            quality_status: status,
            notes: observation
        }
    });
}

return finalResults;
