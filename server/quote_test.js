const cases = [
    '"B.M. College of Technology',
    '""TRUBA INSTITUTE OF PHARMACY',
    '"UJJAIN ENGINEERING COLLEGE',
    '1285-"M.E.S. COLLEGE"',
    '“Fake Quotes” College',
    '\'Single Quotes\' College',
];

cases.forEach(c => {
    let name = c.replace(/^['"\s]+|['"\s]+$/g, '');
    name = name.replace(/^[0-9]+(?:\s*-\s*|\s*\.\s*|\s+)/, '').trim();
    // Re-strip in case the number stripping exposed quotes
    name = name.replace(/^['"\s]+|['"\s]+$/g, '');
    // Strip smart quotes as well
    name = name.replace(/^[“”‘’]+|[“”‘’]+$/g, '');
    console.log(c, '===>', name);
});
