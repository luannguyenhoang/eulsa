export const replaceSeoRM = (input: string) => {
  input = input.replace(
    `link rel="canonical" href="https://admin.eulsa.vn`,
    `link rel="canonical" href="https://eulsa.vn`
  );

  input = input.replace(
    `meta property="og:url" content="https://admin.eulsa.vn`,
    `meta property="og:url" content="https://eulsa.vn`
  );

  input = input.replace(
    `"@id":"https://admin.eulsa.vn/#organization"`,
    `"@id":"https://eulsa.vn/#organization"`
  );

  input = input.replace(
    `https://admin.eulsa.vn/#logo`,
    `https://eulsa.vn/#logo`
  );

  input = input.replace(
    `https://admin.eulsa.vn/#website`,
    `https://eulsa.vn/#website`
  );
  input = input.replace(
    `https://admin.eulsa.vn/#webpage`,
    `https://eulsa.vn/#webpage`
  );
  input = input.replace(
    `"url":"https://admin.eulsa.vn"`,
    `"url":"https://eulsa.vn"`
  );

  input = input.replace(
    `"@type":"WebPage","@id":"https://admin.eulsa.vn`,
    `"@type":"WebPage","@id":"https://eulsa.vn`
  );

  input = input.replace(
    `#webpage","url":"https://admin.eulsa.vn`,
    `#webpage","url":"https://eulsa.vn`
  );

  input = input.replace(
    `"mainEntityOfPage":{"@id":"https://admin.eulsa.vn`,
    `"mainEntityOfPage":{"@id":"https://eulsa.vn/`
  );
  input = input.replace(
    `"worksFor":{"@id":"https://admin.eulsa.vn/#organization`,
    `"worksFor":{"@id":"https://eulsa.vn/#organization`
  );

  input = input.replace(
    `"sameAs":["https://admin.eulsa.vn"]`,
    `"sameAs":["https://eulsa.vn"]`
  );
  return input;
};
