/**
 * Structures the response from an domain search result,
 * extracting relevant information.
 * 
 * @param {object} result - The domain search result object.
 * @returns {object} - The structured response object.
 */
const structureResponse = (result) => {
    const foundEmails = result.response.email_list.map(emailObj => ({
        email: emailObj.email,
        email_anon_id: emailObj.email_anon_id,
        email_type: emailObj.email_type,
        status: emailObj.verification.status
    }));

    const totalFoundEmails = result.response.meta.total_emails;

    const companyInfo = {
        name: result.response.company_enrichment.name,
        size: result.response.company_enrichment.size,
        logo: result.response.company_enrichment.logo,
        website: result.response.company_enrichment.website,
        industry: result.response.company_enrichment.industry,
        description: result.response.company_enrichment.description,
        address: result.response.company_enrichment.location.address
    };

    return { foundEmails, totalFoundEmails, companyInfo };
};

module.exports = structureResponse;