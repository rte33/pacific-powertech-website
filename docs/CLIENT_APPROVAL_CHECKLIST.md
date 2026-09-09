# Brand and Relationship Publication Log

The website must keep two different concepts separate:

1. **Technology and component brands** identify equipment brands shown in Pacific Powertech's supplied catalog artwork. They do not state or imply that the brand owner is a customer, formal partner, or endorser.
2. **Client and partner relationships** require separate written owner approval before any company name, logo, or relationship claim is enabled.

## Approved Technology & Component Brands

On 2026-09-08, the website owner supplied `Screenshot_3.png` and explicitly requested that the following marks appear in the bottom brand section. The public heading is “Technology & Component Brands,” not “Companies We've Worked With.”

| Display order | Brand | Asset status | Publication status |
| ---: | --- | --- | --- |
| 1 | Mitsubishi Electric | Individual official vector | Approved |
| 2 | ABB | Individual official vector | Approved |
| 3 | Fuji Electric | Individual official vector | Approved |
| 4 | LS Electric | Current official identity-kit asset | Approved |
| 5 | Siemens | Official press-site asset | Approved |
| 6 | Selec Controls | Individual official web asset | Approved |
| 7 | Schneider Electric | Individual official 2024 vector | Approved |
| 8 | CHINT | Individual official web asset | Approved |
| 9 | Togami Electric | Individual official vector | Approved |
| 10 | HD Hyundai Electric | Current official identity-kit asset | Approved |

Source data, individual filenames, official website links, order, and enabled state are maintained in `src/content/settings/clients.yaml`. The former cropped screenshot is retained only as owner-supplied reference material and is not rendered on the public site.

## Client & Partner Relationship Claims

No client or partner relationship logos are currently enabled. Before publishing one:

1. Verify the commercial relationship and proposed wording with the website owner.
2. Obtain the logo from an official company source or receive it directly from the owner.
3. Record the approval, date, source URL, and approved claim in this file.
4. Add the entry to `src/content/settings/clients.yaml` with a category other than `Technology & Component Brand` and set `enabled: true` only after sign-off.
