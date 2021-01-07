
import os
from pathlib import Path

from anytree import AnyNode


def get_dir(main_path, root=None, ignore=True, original_path=None):
	main_path = Path(main_path)

	if root is None:
		root = AnyNode(path=main_path.name)

	if original_path is None:
		original_path = main_path

	for path in main_path.iterdir():
		if path.name.startswith('.') and ignore:
			continue

		child = AnyNode(
			path=str(path.relative_to(original_path)).replace('\\', '/'),
			parent=root
		)

		if path.is_dir():
			get_dir(path, child, ignore, original_path)

	return root


if __name__ == '__main__':
	import argparse

	from anytree.exporter.jsonexporter import JsonExporter


	parser = argparse.ArgumentParser(description="Outputs a directory tree as JSON")
	parser.add_argument('path', nargs='?', default=".", help="Path to output to JSON")
	parser.add_argument('-o', '--out', default="./manifest.json", help="Path to output file")
	parser.add_argument('-a', '--all', action="store_const", const=True, help="If used, do not ignore names starting with '.'")
	parser.add_argument('-p', '--pretty', action="store_const", const=2, help="Pretty print the JSON output")
	args = parser.parse_args()

	tree = get_dir(args.path, ignore=not args.all)

	exporter = JsonExporter(indent=args.pretty)
	with Path(args.out).open('w+') as f:
		exporter.write(tree, f)
