"""
File: app/utils/csv_loader.py
Purpose: Utility to parse and validate uploaded CSV files into structured rows
Version: 1.0
"""

import csv
from typing import List, Dict
from io import StringIO

async def parse_csv(file) -> List[Dict]:
    content = await file.read()
    decoded = content.decode("utf-8")
    reader = csv.DictReader(StringIO(decoded))
    return [row for row in reader]