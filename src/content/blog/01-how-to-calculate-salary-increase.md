---
{
  "slug": "how-to-calculate-salary-increase",
  "order": 1,
  "title": "How to Calculate a Salary Increase: Formula, Examples and HR Best Practices",
  "seoTitle": "How to Calculate a Salary Increase: Formula & Examples",
  "description": "Learn how to calculate a salary increase percentage, work out a new salary, and check raise calculations with simple examples and spreadsheet formulas.",
  "primaryKeyword": "how to calculate salary increase",
  "keywords": [
    "how to calculate salary increase",
    "salary increase formula",
    "salary raise percentage",
    "calculate pay raise",
    "salary increment calculator",
    "percentage increase in salary"
  ],
  "intent": "Informational, calculator-focused",
  "date": "2026-11-04",
  "related": [
    {
      "label": "compensation budget planning",
      "href": "/blog/compensation-budget-planning"
    },
    {
      "label": "merit matrix templates",
      "href": "/blog/merit-matrix-template"
    },
    {
      "label": "running a merit cycle",
      "href": "/blog/merit-cycle-best-practices"
    }
  ],
  "sources": [
    {
      "label": "ADP: How to Calculate Salary Raise Percentage",
      "href": "https://www.adp.com/resources/articles-and-insights/articles/c/calculate-percentage-raise.aspx"
    }
  ]
}
---

A salary increase is usually discussed as a percentage, but HR and Finance teams need to translate that percentage into an actual payroll cost. The calculation is straightforward. The harder part is making sure everyone uses the same salary figure, effective date and eligibility rules.

### Quick answer: What is the salary increase formula?

To calculate a salary increase percentage, subtract the employee’s previous salary from the new salary, divide the difference by the previous salary, and multiply by 100.

**Salary increase percentage = ((New salary − Current salary) ÷ Current salary) × 100**

To calculate the new salary from a percentage increase:

**New salary = Current salary × (1 + Increase percentage ÷ 100)**

### Example 1: Calculate the percentage increase

An employee’s annual base salary changes from $60,000 to $63,000.

1. Increase amount: $63,000 − $60,000 = $3,000.
2. Divide the increase by the old salary: $3,000 ÷ $60,000 = 0.05.
3. Convert the result to a percentage: 0.05 × 100 = **5%**.

The employee received a 5% salary increase.

### Example 2: Calculate the new salary from a percentage

An employee earns $60,000 and receives a 4% increase.

- Increase amount: $60,000 × 0.04 = $2,400.
- New annual base salary: $60,000 + $2,400 = **$62,400**.

The same calculation can be written as $60,000 × 1.04.

### Example 3: Calculate the increase amount only

If an employee earns LKR 180,000 per month and receives a 6% increase:

- Monthly increase: LKR 180,000 × 0.06 = **LKR 10,800**.
- New monthly salary: LKR 180,000 + LKR 10,800 = **LKR 190,800**.

This is an illustrative calculation, not a recommendation that 6% is an appropriate increase.

### What spreadsheet formulas can HR use?

Assume cell `A2` contains the current salary, `B2` contains the new salary and `C2` contains the increase percentage.

| Goal | Excel or Google Sheets formula |
|---|---|
| Increase amount | `=B2-A2` |
| Increase percentage | `=IFERROR((B2-A2)/A2,0)` |
| New salary from a percentage in C2 | `=A2*(1+C2)` |

Format the percentage result as a percentage. In the third formula, enter `4%` in C2, not `4`, or the result will be 400% higher. If the current salary can be zero or blank, decide how the sheet should flag that record rather than silently treating it as a normal raise.

### Five checks before confirming a raise

**1. Use the same pay basis.** Compare annual base salary with annual base salary, or monthly base salary with monthly base salary. Do not compare base pay with total compensation that includes bonuses or benefits.

**2. Confirm working hours and FTE.** A part-time employee’s salary may need to be normalized to a full-time equivalent for like-for-like analysis. Keep the actual contractual pay calculation separate from the normalized comparison.

**3. Confirm the effective date.** A raise effective halfway through a payroll period may create a prorated cost in the first period. The annualized salary and the cash paid in the first month are not necessarily the same figure.

**4. Separate different reasons for pay changes.** A merit increase, promotion adjustment, market correction and statutory wage adjustment should not automatically be treated as the same type of decision.

**5. Check the total budget impact.** A 5% increase for one employee is easy to calculate. A 5% increase for an entire department must be calculated across every eligible salary, including any employer-side payroll costs that Finance needs to budget for.

### Does a higher percentage always mean a fairer increase?

No. A percentage is a calculation, not a fairness test. Two employees with different roles, performance, current pay positions and market conditions may reasonably receive different outcomes under a clearly defined policy. HR should be able to explain the factors behind the decision and apply them consistently.

For a merit cycle, model the cost across the full eligible population before publishing criteria. A percentage that appears affordable when tested on a handful of employees can exceed the budget when applied across a department or company.

### Frequently asked questions

**How do I calculate a 5% salary increase?**  
Multiply the current salary by 0.05 to find the increase amount, then add that amount to the current salary. Alternatively, multiply the current salary by 1.05 to calculate the new salary.

**How do I calculate the percentage difference between two salaries?**  
Use `((New salary − Old salary) ÷ Old salary) × 100`. The old salary is the comparison baseline.

**Is a salary increase percentage calculated on gross or net salary?**  
For compensation planning, employers commonly calculate a raise against the employee’s contractual gross base pay, before employee deductions. Confirm the exact pay definition in the organization’s policy and use it consistently.

**Should the first month’s payroll increase equal the annual raise amount divided by 12?**  
Not always. The first payroll may be prorated depending on the effective date, payroll rules and employment terms. The annualized salary rate and the amount paid in a particular month are different measures.

### Make salary calculations part of a controlled process

A reliable compensation process needs more than a calculator. HR and Finance need to agree on eligible employees, pay definitions, increase rules and the total budget before decisions are communicated. MeritCyc helps teams model salary-increment scenarios before criteria are published and maintain a consistent record of decisions.
