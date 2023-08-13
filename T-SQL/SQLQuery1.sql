WITH RecursiveSubdivisions AS (
    SELECT 
        id AS sub_id,
        name AS sub_name,
        parent_id,
        1 AS sub_level
    FROM subdivisions
    WHERE id = (SELECT subdivision_id FROM collaborators WHERE id = 710253)
    UNION ALL
    SELECT 
        s.id AS sub_id,
        s.name AS sub_name,
        s.parent_id,
        rs.sub_level + 1 AS sub_level
    FROM subdivisions AS s
    JOIN RecursiveSubdivisions AS rs ON s.parent_id = rs.sub_id
)
SELECT 
    c.id,
    c.name,
    rs.sub_name,
    rs.sub_id,
    rs.sub_level,
    (SELECT COUNT(*) FROM collaborators WHERE subdivision_id = rs.sub_id) AS colls_count
FROM RecursiveSubdivisions AS rs
JOIN collaborators AS c ON rs.sub_id = c.subdivision_id
WHERE 
    c.age < 40 AND 
    LEN(c.name) > 11 AND 
    c.subdivision_id NOT IN (100055, 100059)
ORDER BY rs.sub_level ASC;
