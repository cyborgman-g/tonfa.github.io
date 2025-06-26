#!/usr/bin/env python3
"""
Knowledge Distillation Example Script for SoundByte

This script demonstrates running a knowledge distillation experiment
using ResNet-18 as teacher and SimpleConvNet as student on CIFAR-10.

Usage:
    python examples/run_distillation.py
"""

import sys
from pathlib import Path

# Add src to path for development
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

import logging
from soundbyte import run_experiment, load_config


def main():
    """Run distillation example."""

    # Setup logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    # Get config path
    config_path = Path(__file__).parent / "configs/distillation_example.json"

    if not config_path.exists():
        logger.error(f"Configuration file not found: {config_path}")
        return 1

    logger.info("Starting CIFAR-10 knowledge distillation example")
    logger.info(f"Using configuration: {config_path}")

    try:
        # Load and validate config
        config = load_config(config_path)
        logger.info(f"Loaded configuration for experiment: {config.name}")

        # Run experiment
        results = run_experiment(str(config_path))

        # Print results summary
        print("\n" + "="*60)
        print("KNOWLEDGE DISTILLATION EXPERIMENT COMPLETED")
        print("="*60)

        if 'test_metrics' in results:
            test_metrics = results['test_metrics']
            print(f"Student Test Accuracy: {test_metrics.get('student_accuracy', test_metrics.get('accuracy', 0)):.2f}%")
            if 'teacher_accuracy' in test_metrics:
                print(f"Teacher Test Accuracy: {test_metrics['teacher_accuracy']:.2f}%")
            if 'agreement' in test_metrics:
                print(f"Teacher-Student Agreement: {test_metrics['agreement']:.2f}%")

        if 'best_val_accuracy' in results:
            print(f"Best Student Validation Accuracy: {results['best_val_accuracy']:.2f}%")

        if 'training_time' in results:
            print(f"Training Time: {results['training_time']:.2f} seconds")

        print(f"Results saved to: {config.output_dir}")
        print("="*60)

        return 0

    except Exception as e:
        logger.error(f"Experiment failed: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
