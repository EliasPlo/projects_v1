import requests
import json

def fetch_data(url):
    """Fetch JSON data from the given URL."""
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

def display_data(data, keys=None):
    """Display specified keys from the JSON data."""
    if not data:
        print("No data to display.")
        return

    for index, item in enumerate(data):
        if keys:
            filtered_item = {key: item.get(key, 'N/A') for key in keys}
            print(json.dumps(filtered_item, indent=2, ensure_ascii=False))
        else:
            print(json.dumps(item, indent=2, ensure_ascii=False))

        if index >= 4:  # Show only the first 5 entries
            print("\n...Showing only the first 5 items.\n")
            break

def main():
    url = "https://avoindata-prod-datasets.s3.eu-west-1.amazonaws.com/resources/b276a51e-e47d-459f-b4f6-bcf979bdd9aa/kemikaalikoodistot.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5ERTGXPJBTP234VO%2F20250108%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250108T101511Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIFlbVcHoNgJcJH2LNHIw8i8gjegNnVs3W4ANcXL0VpzkAiEAhqjQ4reK8fk7Ra9qkxjvzTzui%2B9CHsFFQlK4AHkWidsqswQIcxAAGgw5MDMxMjQyNzAwMzQiDDALUKTI%2Bqq8rXaUmiqQBHJJ%2Fbdc9nu8HkdlH4LU%2BKzbhxiCafA4KlfJNoCTnc0bzoPwfhPKzgiqKL9LeC2Eie9PrJAhV77JDk0henVeYV%2F3oaxln8N%2FMeaIMlGI8W7TGAf8qRDtVABv3aaoFI7FqdRF3eNw0V3iORmVSWZZyxXhb%2FMxihcomuRrd3qv9crDFE6T8MuwoQ7xGrtcu88vz7YZX5laNk2Ew9hWVKwIXrepS87LSLAycd7hq9VyyYP1lnowSPPvxDGrCD%2FgJ%2BI0hTz76dBiErOyxA4XynQ2Ma1dvB5cc4BmdEtXM2EEnZsV7HW2fByliqZzmgFayQCN40ADdrIcE2ky%2BwSexl8rEV7iHjUUQY4LpOKTYMpL2iIi4da%2B37tfiqDH6t8UHm2PgkHHjOMi4Clr%2Bn9m5%2F8tl%2BCPsIcy9mvUEFQ0izNj1pQ9s5yXM63i5BAWdJj8szxfp8wCCocH5LodQO6Y0P1oavuRlhjjvc4PDJX975MHO9FGHDYpdK7OcE39BZWxSvprQilgp4ZQj01HZyP0nOZzZYYDLq%2FPjE%2F0NigSIhkbkEfga%2BnJ9CJcdmUcv%2F1gti1mPYKRRTW8Mud81dITGthei7WTpwqEE9hBscMe4iK61y0BxQmzm0Yte7SnmJLBnu0UAx1taMDxfNPQ%2BLw4Vb38nrbJ09RfGNyf0r%2BDLkgjhHkgiZLgw7fEHTS3CnZ451P99zCzl%2Fm7BjqmAYMeu%2ByUKecRZMwl1g5qMChlvcrktiArYzRdt%2B6RIIHdpALXaNznDVrPxNlSjvJIxuCPCqaSFcd24Hg4RDzlILR0yoDh0teEq5920%2FWRWn5JZ261eG%2F0D4VmwgaMI8OPtufuN%2BjLw6PqK%2BfaSKgKht69w6%2B4R7Y8VA9TIZOaiqxsUPlI5bh7ewlTA4KR4MPiGmgMCw5YUVYNcHoE7L6AOigx%2Bp8HT8s%3D&X-Amz-Signature=9acf1729ad789eb1709835b4445bfc198eb14736489e1c84bd8d3bfe6f7602cb"

    print("Fetching data from the URL...\n")
    data = fetch_data(url)

    if data:
        print("Data fetched successfully!\n")
        print("Here are some example entries:\n")
        display_data(data)

        print("\nYou can filter the data by providing specific keys.")
        keys = input("Enter comma-separated keys (or press Enter to skip): ").split(",")
        if keys and keys[0]:
            keys = [key.strip() for key in keys]
            display_data(data, keys=keys)

if __name__ == "__main__":
    main()
